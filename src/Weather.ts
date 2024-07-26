
const data = {
  'Limsa Lominsa': ['Clouds', 20, 'Clear Skies', 50, 'Fair Skies', 80, 'Fog', 90, 'Rain'],
  'Middle La Noscea': ['Clouds', 20, 'Clear Skies', 50, 'Fair Skies', 70, 'Wind', 80, 'Fog', 90, 'Rain'],
  'Lower La Noscea': ['Clouds', 20, 'Clear Skies', 50, 'Fair Skies', 70, 'Wind', 80, 'Fog', 90, 'Rain'],
  'Eastern La Noscea': ['Fog', 5, 'Clear Skies', 50, 'Fair Skies', 80, 'Clouds', 90, 'Rain', 95, 'Showers'],
  'Western La Noscea': ['Fog', 10, 'Clear Skies', 40, 'Fair Skies', 60, 'Clouds', 80, 'Wind', 90, 'Gales'],
  'Upper La Noscea': ['Clear Skies', 30, 'Fair Skies', 50, 'Clouds', 70, 'Fog', 80, 'Thunder', 90, 'Thunderstorms'],
  'Outer La Noscea': ['Clear Skies', 30, 'Fair Skies', 50, 'Clouds', 70, 'Fog', 85, 'Rain'],
  'The Mist': ['Clouds', 20, 'Clear Skies', 50, 'Fair Skies', 70, 'Fair Skies', 80, 'Fog', 90, 'Rain'],
  'Gridania': ['Rain', 5, 'Rain', 20, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 55, 'Clear Skies', 85, 'Fair Skies'],
  'Central Shroud': ['Thunder', 5, 'Rain', 20, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 55, 'Clear Skies', 85, 'Fair Skies'],
  'East Shroud': ['Thunder', 5, 'Rain', 20, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 55, 'Clear Skies', 85, 'Fair Skies'],
  'South Shroud': ['Fog', 5, 'Thunderstorms', 10, 'Thunder', 25, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 70, 'Clear Skies'],
  'North Shroud': ['Fog', 5, 'Showers', 10, 'Rain', 25, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 70, 'Clear Skies'],
  'The Lavender Beds': ['Clouds', 5, 'Rain', 20, 'Fog', 30, 'Clouds', 40, 'Fair Skies', 55, 'Clear Skies', 85, 'Fair Skies'],
  'Ul\'dah': ['Clear Skies', 40, 'Fair Skies', 60, 'Clouds', 85, 'Fog', 95, 'Rain'],
  'Western Thanalan': ['Clear Skies', 40, 'Fair Skies', 60, 'Clouds', 85, 'Fog', 95, 'Rain'],
  'Central Thanalan': ['Dust Storms', 15, 'Clear Skies', 55, 'Fair Skies', 75, 'Clouds', 85, 'Fog', 95, 'Rain'],
  'Eastern Thanalan': ['Clear Skies', 40, 'Fair Skies', 60, 'Clouds', 70, 'Fog', 80, 'Rain', 85, 'Showers'],
  'Southern Thanalan': ['Heat Waves', 20, 'Clear Skies', 60, 'Fair Skies', 80, 'Clouds', 90, 'Fog'],
  'Northern Thanalan': ['Clear Skies', 5, 'Fair Skies', 20, 'Clouds', 50, 'Fog'],
  'The Goblet': ['Clear Skies', 40, 'Fair Skies', 60, 'Clouds', 85, 'Fog', 95, 'Rain'],
  'Ishgard': ['Snow', 60, 'Fair Skies', 70, 'Clear Skies', 75, 'Clouds', 90, 'Fog'],
  'Coerthas Central Highlands': ['Blizzards', 20, 'Snow', 60, 'Fair Skies', 70, 'Clear Skies', 75, 'Clouds', 90, 'Fog'],
  'Coerthas Western Highlands': ['Blizzards', 20, 'Snow', 60, 'Fair Skies', 70, 'Clear Skies', 75, 'Clouds', 90, 'Fog'],
  'Empyreum': ['Snow', 5, 'Fair Skies', 25, 'Clear Skies', 65, 'Clouds', 80, 'Fog'],
  'The Sea of Clouds': ['Clear Skies', 30, 'Fair Skies', 60, 'Clouds', 70, 'Fog', 80, 'Wind', 90, 'Umbral Wind'],
  'Azys Lla': ['Fair Skies', 35, 'Clouds', 70, 'Thunder'],
  'The Diadem': ['Fair Skies', 30, 'Fog', 60, 'Wind', 90, 'Umbral Wind'],
  'Idyllshire': ['Clouds', 10, 'Fog', 20, 'Rain', 30, 'Showers', 40, 'Clear Skies', 70, 'Fair Skies'],
  'The Dravanian Forelands': ['Clouds', 10, 'Fog', 20, 'Thunder', 30, 'Dust Storms', 40, 'Clear Skies', 70, 'Fair Skies'],
  'The Dravanian Hinterlands': ['Clouds', 10, 'Fog', 20, 'Rain', 30, 'Showers', 40, 'Clear Skies', 70, 'Fair Skies'],
  'The Churning Mists': ['Clouds', 10, 'Gales', 20, 'Umbral Static', 40, 'Clear Skies', 70, 'Fair Skies'],
  'Mor Dhona': ['Clouds', 15, 'Fog', 30, 'Gloom', 60, 'Clear Skies', 75, 'Fair Skies'],
  'Rhalgr\'s Reach': ['Clear Skies', 15, 'Fair Skies', 60, 'Clouds', 80, 'Fog', 90, 'Thunder'],
  'The Fringes': ['Clear Skies', 15, 'Fair Skies', 60, 'Clouds', 80, 'Fog', 90, 'Thunder'],
  'The Peaks': ['Clear Skies', 10, 'Fair Skies', 60, 'Clouds', 75, 'Fog', 85, 'Wind', 95, 'Dust Storms'],
  'The Lochs': ['Clear Skies', 20, 'Fair Skies', 60, 'Clouds', 80, 'Fog', 90, 'Thunderstorms'],
  'Kugane': ['Rain', 10, 'Fog', 20, 'Clouds', 40, 'Fair Skies', 80, 'Clear Skies'],
  'Shirogane': ['Rain', 10, 'Fog', 20, 'Clouds', 40, 'Fair Skies', 80, 'Clear Skies'],
  'The Ruby Sea': ['Thunder', 10, 'Wind', 20, 'Clouds', 35, 'Fair Skies', 75, 'Clear Skies'],
  'Yanxia': ['Showers', 5, 'Rain', 15, 'Fog', 25, 'Clouds', 40, 'Fair Skies', 80, 'Clear Skies'],
  'The Azim Steppe': ['Gales', 5, 'Wind', 10, 'Rain', 17, 'Fog', 25, 'Clouds', 35, 'Fair Skies', 75, 'Clear Skies'],
  'Eureka Anemos': ['Fair Skies', 30, 'Gales', 60, 'Showers', 90, 'Snow'],
  'Eureka Pagos': ['Clear Skies', 10, 'Fog', 28, 'Heat Waves', 46, 'Snow', 64, 'Thunder', 82, 'Blizzards'],
  'Eureka Pyros': ['Fair Skies', 10, 'Heat Waves', 28, 'Thunder', 46, 'Blizzards', 64, 'Umbral Wind', 82, 'Snow'],
  'Eureka Hydatos': ['Fair Skies', 12, 'Showers', 34, 'Gloom', 56, 'Thunderstorms', 78, 'Snow'],
  'Bozjan Southern Front': ['Fair Skies', 52, 'Rain', 64, 'Wind', 76, 'Thunder', 88, 'Dust Storms'],
  'Zadnor': ['Fair Skies', 60, 'Rain', 70, 'Wind', 80, 'Thunder', 90, 'Snow'],
  'The Crystarium': ['Clear Skies', 20, 'Fair Skies', 60, 'Clouds', 75, 'Fog', 85, 'Rain', 95, 'Thunderstorms'],
  'Eulmore': ['Gales', 10, 'Rain', 20, 'Fog', 30, 'Clouds', 45, 'Fair Skies', 85, 'Clear Skies'],
  'Lakeland': ['Clear Skies', 20, 'Fair Skies', 60, 'Clouds', 75, 'Fog', 85, 'Rain', 95, 'Thunderstorms'],
  'Kholusia': ['Gales', 10, 'Rain', 20, 'Fog', 30, 'Clouds', 45, 'Fair Skies', 85, 'Clear Skies'],
  'Amh Araeng': ['Fair Skies', 45, 'Clouds', 60, 'Dust Storms', 70, 'Heat Waves', 80, 'Clear Skies'],
  'Il Mheg': ['Rain', 10, 'Fog', 20, 'Clouds', 35, 'Thunderstorms', 45, 'Clear Skies', 60, 'Fair Skies'],
  'The Rak\'tika Greatwood': ['Fog', 10, 'Rain', 20, 'Umbral Wind', 30, 'Clear Skies', 45, 'Fair Skies', 85, 'Clouds'],
  'The Tempest': ['Clouds', 20, 'Fair Skies', 80, 'Clear Skies'],
  'Old Sharlayan': ['Clear Skies', 10, 'Fair Skies', 50, 'Clouds', 70, 'Fog', 85, 'Snow'],
  'Radz-at-Han': ['Fog', 10, 'Rain', 25, 'Clear Skies', 40, 'Fair Skies', 80, 'Clouds'],
  'Labyrinthos': ['Clear Skies', 15, 'Fair Skies', 60, 'Clouds', 85, 'Rain'],
  'Thavnair': ['Fog', 10, 'Rain', 20, 'Showers', 25, 'Clear Skies', 40, 'Fair Skies', 80, 'Clouds'],
  'Garlemald': ['Snow', 45, 'Thunder', 50, 'Rain', 55, 'Fog', 60, 'Clouds', 85, 'Fair Skies', 95, 'Clear Skies'],
  'Mare Lamentorum': ['Umbral Wind', 15, 'Moon Dust', 30, 'Fair Skies'],
  'Elpis': ['Clouds', 25, 'Umbral Wind', 40, 'Fair Skies', 85, 'Clear Skies'],
  'Ultima Thule': ['Astromagnetic Storm', 15, 'Fair Skies', 85, 'Umbral Wind'],
  'Unnamed Island': ['Clear Skies', 25, 'Fair Skies', 70, 'Clouds', 80, 'Rain', 90, 'Fog', 95, 'Showers'],
};

export type Zone = keyof typeof data;

export const zones = Object.keys(data) as Zone[];

export const zoneWeathers = {} as { [index in Zone] : string[] };
for (const zone of zones) {
  zoneWeathers[zone] = data[zone].filter((x, i) => i % 2 === 0) as string[];
}

export function calculateForecastTarget(timestamp: number): number {
  // Thanks to Rogueadyn's SaintCoinach library for this calculation.
  const unix = Math.trunc(timestamp / 1000);
  // Get Eorzea hour for weather start
  const bell = Math.trunc(unix / 175);
  // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
  const increment = (bell + 8 - (bell % 8)) % 24;
  // Take Eorzea days since unix epoch
  const totalDays = Math.trunc(unix / 4200) >>> 0;
  const calcBase = totalDays * 0x64 + increment;
  const step1 = ((calcBase << 0xB) ^ calcBase) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  return step2 % 0x64;
}

export interface Match { begin: Date, end: Date, duration: number, weathers: string[] }

export let state: {
  start: number,
  weathers: { [index in Zone] : number[] },
  getter: (zone: Zone, i: number, j: number, skipWeatherList?: boolean) => Match,
  buffer: (boolean | undefined)[],
};

export const weatherDuration = 8 * 175 * 1000;
export const future = 60;

export function init(): void {
  const now = Date.now();
  const start = now - (now % (weatherDuration * 3)) - weatherDuration * 7;
  if (state?.start === start) return;

  const futureET = Math.ceil(future * 24 * 60 * 60 / 175 / 8) + 1;
  const forecasts = new Array(futureET);
  for (let i = 0; i < futureET; i++) {
    forecasts[i] = calculateForecastTarget(start + weatherDuration * i);
  }

  const weathers = {} as typeof state.weathers;
  for (const zone of zones) {
    const forecastWeathers: number[] = new Array(100);
    let forecast = 0;
    for (let i = 0; i < 100; i++) {
      if (i === data[zone][forecast * 2 + 1]) forecast++;
      forecastWeathers[i] = forecast;
    }
    weathers[zone] = new Array(futureET);
    for (let i = 0; i < futureET; i++) {
      weathers[zone][i] = forecastWeathers[forecasts[i]];
    }
  }

  const getter = (zone: Zone, i: number, j: number, skipWeatherList?: boolean) => ({
    begin: new Date(start + i * 175 * 1000),
    end: new Date(start + j * 175 * 1000 - 1),
    duration: j - i,
    weathers: skipWeatherList ? [] : weathers[zone]
      .slice(Math.floor(i / 8) - 1, Math.floor((j - 1) / 8) + 1)
      .map(w => zoneWeathers[zone][w]),
  });

  const buffer = new Array(futureET * 8);

  state = { start, weathers, getter, buffer };
}

export function isHourIn(begin: number, end: number, hour: number): boolean {
  return (begin <= hour && hour <= end) || (end < begin && (hour <= end || begin <= hour));
}

export function hasWeather(weathers: ReadonlySet<number> | undefined, weather: number): boolean {
  return weathers === undefined || weathers.size === 0 || weathers.has(weather);
}

export function find(condition: {
  zone: Zone,
  desiredWeathers?: ReadonlySet<number>,
  previousWeathers?: ReadonlySet<number>,
  hours?: ReadonlySet<number>,
  beginHour?: number,
  endHour?: number,
}): ((skipWeatherList?: boolean) => Match)[] {
  init();

  const zone = condition.zone;
  const desiredWeatherMask = zoneWeathers[zone].map((_, i) => hasWeather(condition.desiredWeathers, i));
  const previousWeatherMask = zoneWeathers[zone].map((_, i) => hasWeather(condition.previousWeathers, i));
  const weathers = state.weathers[zone];

  const hourMask = Array.from({ length: 24 }, (_, i) => condition.hours?.has(i) ??
    isHourIn(condition.beginHour ?? 0, condition.endHour ?? 23, i));
  const baseHour = Math.round(state.start / 175 / 100);

  const matched = state.buffer.fill(false);
  for (let i = 8; i < matched.length; i++) {
    const weatherIndex = Math.floor(i / 8);
    if (!desiredWeatherMask[weathers[weatherIndex]]) continue;
    if (!previousWeatherMask[weathers[weatherIndex - 1]]) continue;
    if (!hourMask[(baseHour + i) % 24]) continue;
    matched[i] = true;
  }

  const ret = [];
  let i = 0;
  let j = 0;
  while (true) {
    i = j;
    while (matched[i] === false) i++;
    if (i >= matched.length) break;
    j = i;
    while (matched[j] === true) j++;
    ret.push(state.getter.bind(null, zone, i, j));
  }
  return ret;
}

export const groupedZones: Zone[][] = [
  ['Limsa Lominsa', 'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea',
    'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea', 'The Mist'],
  ['Gridania', 'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud',
    'The Lavender Beds'],
  ['Ul\'dah', 'Western Thanalan', 'Central Thanalan', 'Eastern Thanalan',
    'Southern Thanalan', 'Northern Thanalan', 'The Goblet'],
  ['Ishgard', 'Coerthas Central Highlands', 'Coerthas Western Highlands', 'Empyreum'],
  ['The Sea of Clouds', 'Azys Lla'],
  ['Idyllshire', 'The Dravanian Forelands', 'The Dravanian Hinterlands', 'The Churning Mists'],
  ['Rhalgr\'s Reach', 'The Fringes', 'The Peaks', 'The Lochs'],
  ['Kugane', 'Shirogane'],
  ['The Ruby Sea', 'Yanxia', 'The Azim Steppe'],
  ['Radz-at-Han', 'Thavnair', 'Garlemald'],
  ['The Crystarium', 'Eulmore', 'Lakeland', 'Kholusia', 'Amh Araeng', 'Il Mheg',
    'The Rak\'tika Greatwood', 'The Tempest'],
  ['Mor Dhona'],
  ['Old Sharlayan', 'Labyrinthos'],
  ['Mare Lamentorum', 'Ultima Thule'],
  ['Elpis'],
  ['Eureka Anemos', 'Eureka Pagos', 'Eureka Pyros', 'Eureka Hydatos'],
  ['Bozjan Southern Front', 'Zadnor'],
  ['Unnamed Island'],
];

export const zoneShorthands = {} as { [index in Zone]: string };
export const shorthandZones = {} as { [index: string]: Zone };
(() => {
  const wordCounts: { [index: string]: number }[] = [{}, {}, {}];
  const shorthands = zones
    .map(zone => {
      let parts = zone.replace(/[^\w ]/g, '').split(' ');
      parts = parts[0] === 'The' ? parts.slice(1) : parts;
      for (let i = 0; i < parts.length; i++) {
        wordCounts[i][parts[i]] = (wordCounts[i][parts[i]] || 0) + 1;
      }
      return parts;
    })
    .map(parts => {
      let shorthand;
      if (wordCounts[0][parts[0]] > 1 || wordCounts[1][parts[1]] > 1) {
        shorthand = parts[0].slice(0, 2) + parts[1].slice(0, 2);
      } else {
        shorthand = parts.join('').slice(0, 4);
      }
      return shorthand.toLowerCase();
    });
  for (let i = 0; i < zones.length; i++) {
    zoneShorthands[zones[i]] = shorthands[i];
    shorthandZones[shorthands[i]] = zones[i];
  }
})();

export const events = {
  garlok: {
    description: 'Garlok',
    matcher: () =>
      find({
        zone: 'Eastern La Noscea',
        desiredWeathers: new Set([0, 1, 2, 3]),
      })
      .map(m => {
        const match = m(true);
        match.begin.setMinutes(match.begin.getMinutes() + 200);
        return match;
      })
      .filter(m => m.begin < m.end),
  },
  laideronnette: {
    description: 'Laideronnette',
    matcher: () =>
      find({
        zone: 'Central Shroud',
        desiredWeathers: new Set([1]),
      })
      .map(m => {
        const match = m(true);
        match.begin.setMinutes(match.begin.getMinutes() + 30);
        return match;
      })
      .filter(m => m.begin < m.end),
  },
};
export type EventId = keyof typeof events;
