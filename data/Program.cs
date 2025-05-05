using System.Collections.Specialized;
using System.Text;
using Lumina;
using Lumina.Excel;
using Lumina.Excel.Sheets;
using Lumina.Text.ReadOnly;

var lumina = new GameData(args[0], new() { DefaultExcelLanguage = Lumina.Data.Language.English });
var luminaCn = new GameData(args[1], new() { DefaultExcelLanguage = Lumina.Data.Language.ChineseSimplified });

var escape = (ReadOnlySeString? s) => s?.ExtractText()?.Replace("'", "\\'");

var weathers = new OrderedDictionary();
var placeUsed = new HashSet<uint>();
var weatherUsed = new HashSet<uint>();
{
    var territoryTypeSheet = lumina.GetExcelSheet<TerritoryType>()!;
    var weatherSheet = lumina.GetExcelSheet<Weather>()!;
    var weatherReportReplaceSheet = lumina.GetExcelSheet<WeatherReportReplace>()!;
    var weatherReportReplaces = weatherReportReplaceSheet.ToDictionary(x => x.PlaceNameSub.RowId, x => x.PlaceNameParent);
    foreach (var territoryType in territoryTypeSheet)
    {
        var weatherRate = territoryType.WeatherRate.Value;
        if (weatherRate.Rate[0] == 100) continue;
        if (!weatherReportReplaces.TryGetValue(territoryType.PlaceName.RowId, out var placeName))
        {
            placeName = territoryType.PlaceName;
        }
        placeUsed.Add(placeName.RowId);
        var line = new StringBuilder();
        line.Append("  '"); line.Append(escape(placeName.ValueNullable?.Name) ?? ""); line.Append("': [");
        var rate = 0;
        foreach (var (weather, rate_) in weatherRate.Weather.Zip(weatherRate.Rate))
        {
            if (weather.RowId == 0) break;
            weatherUsed.Add(weather.RowId);
            rate += rate_;
            line.Append('\''); line.Append(escape(weather.Value.Name)); line.Append('\'');
            if (rate == 100) break;
            line.Append(", "); line.Append(rate); line.Append(", ");
        }
        line.Append("],");
        weathers[line.ToString()] = null;
    }
}
File.WriteAllLines("weathers.txt", weathers.Keys.Cast<string>());

var langs = new StringBuilder();
void extractLangs<T>(Func<T?, ReadOnlySeString?> getText, HashSet<uint> used) where T : struct, IExcelRow<T>
{
    var weatherNameSheets = new (string lang, ExcelSheet<T> sheet)[]
    {
        ("en", lumina.GetExcelSheet<T>(Lumina.Data.Language.English)!),
        ("de", lumina.GetExcelSheet<T>(Lumina.Data.Language.German)!),
        ("fr", lumina.GetExcelSheet<T>(Lumina.Data.Language.French)!),
        ("ja", lumina.GetExcelSheet<T>(Lumina.Data.Language.Japanese)!),
        ("zh", luminaCn.GetExcelSheet<T>()!),
        ("ko", lumina.GetExcelSheet<T>(Lumina.Data.Language.Korean)!),
    };
    var count = weatherNameSheets[0].sheet.Count;
    for (var i = 0u; i < count; i++)
    {
        if (!used.Contains(i)) continue;
        var names = weatherNameSheets.Select(x => (x.lang, name: escape(getText(x.sheet.GetRowOrDefault(i))) ?? "")).ToArray();
        var key = names[0].name;
        if (string.IsNullOrEmpty(key)) continue;

        langs.Append("  '"); langs.Append(key); langs.AppendLine("': {");
        foreach (var (lang, name) in names)
        {
            langs.Append("    "); langs.Append(lang); langs.Append(": '"); langs.Append(name); langs.AppendLine("',");
        }
        langs.AppendLine("  },");
    }
}
extractLangs<PlaceName>(row => row?.Name, placeUsed);
langs.AppendLine("//");
extractLangs<Weather>(row => row?.Name, weatherUsed);
File.WriteAllText("langs.txt", langs.ToString());
