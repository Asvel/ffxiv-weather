import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strftimeLT from 'strftime';
import * as classNames from 'classnames';
import * as W from './Weather';
import texts from './texts';
import 'normalize.css';
import './app.css';

function t(s: TemplateStringsArray | string): string {
  const text = typeof s === 'string' ? s : s[0];
  return texts[text]?.cn || text;
}
function format(template: string, args: { [index: string]: string | number }): string {
  return template.replace(/{(\w+)}/g, (match, key) => args[key] as string);
}

let strftime = strftimeLT;

interface Condition {
  event: keyof typeof events | null;
  zone: W.Zone | null,
  desiredWeathers: number[],
  previousWeathers: number[],
  beginHour: number,
  endHour: number,
}

interface AppState extends Condition {
  hoverHour: number | null,
  showCount: number,
}

class App extends React.Component<any, AppState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      ...parseHash(window.location.hash),
      hoverHour: null,
      showCount: 11,
    };
  }
  public render() {
    const { event, zone, desiredWeathers, previousWeathers, beginHour, endHour, hoverHour, showCount } = this.state;
    strftime = strftimeLT;
    if (event !== null) {
      strftime = strftime.timezone(+480) as any;
      const matches = events[event].matcher();
      return (
        <div className="app">
          <div className="console clearfix">
            <span className="console_summary">{events[event].description}</span>
            <span className="console_timezone">UTC+08:00</span>
          </div>
          <div className="match">
            <table>
              <thead>
              <tr>
                <th className="match_event-start-time">{t`Start Time`}</th>
                <th className="match_event-end-time">{t`End Time`}</th>
              </tr>
              </thead>
              <tbody>
              {matches.slice(0, 20).map((x, i) => (
                <tr key={i}>
                  <td className="match_event-start-time">
                    <span className="match_local-time-date">{strftime('%m/%d ', x.begin)}</span>
                    <FriendlyTime date={x.begin} />
                  </td>
                  <td className="match_event-end-time">
                    <span className="match_local-time-date">{strftime('%m/%d ', x.end)}</span>
                    <FriendlyTime date={x.end} />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    const matches = zone ? W.find({ zone, desiredWeathers, previousWeathers, beginHour, endHour }) : [];
    const list = zone && matches.length === 1 ? W.find({ zone, hourMask: { 0: true, 8: true, 16: true } }) : [];
    return (
      <div className="app">
        <div className="condition">
          <div className="condition_zone">
            <span className="condition-title">
              {zone ? t`Zone` : t`Select Zone`}
            </span>
            {groupedZones.map((g, i) => (
              <span key={i} className="condition_zone-group">
                {g.map(z => (
                  <span
                    key={z}
                    className={classNames('condition_zone-item', zone === z && '-active')}
                    onClick={() => this.setState({
                      zone: z,
                      desiredWeathers: [],
                      previousWeathers: [],
                      beginHour: 0,
                      endHour: 23,
                      hoverHour: null,
                      showCount: 11,
                    })}
                    children={t(z)}
                  />
                ))}
              </span>
            ))}
          </div>
          {zone && <>
            <div className="condition_weather">
              <span className="condition-title">
                {t`Weather`}
                <span className="condition-tip">{t`Right click to multiple select`}</span>
              </span>
              <span
                className="condition_weather-selector"
                onContextMenu={e => e.preventDefault()}
              >
                <span
                  className={classNames('condition_weather-item', desiredWeathers.length === 0 && '-active')}
                  onClick={() => this.setState({ desiredWeathers: [] })}
                  onContextMenu={() => this.setState({ desiredWeathers: [] })}
                  children={t`Any`}
                />
                {zone && W.zoneWeathers[zone].map((x, i) => (
                  <span
                    key={i}
                    className={classNames('condition_weather-item', desiredWeathers.indexOf(i) !== -1 && '-active')}
                    onClick={() => this.setState({ desiredWeathers: [i] })}
                    onContextMenu={() => this.setState({ desiredWeathers: toggleWeather(desiredWeathers, i) })}
                    children={t(x)}
                  />
                ))}
              </span>
            </div>
            <div className="condition_weather">
              <span className="condition-title">
                {t`Previous Weather`}
                <span className="condition-tip">{t`Right click to multiple select`}</span>
              </span>
              <span
                className="condition_weather-selector"
                onContextMenu={e => e.preventDefault()}
              >
                <span
                  className={classNames('condition_weather-item', previousWeathers.length === 0 && '-active')}
                  onClick={() => this.setState({ previousWeathers: [] })}
                  onContextMenu={() => this.setState({ previousWeathers: [] })}
                  children={t`Any`}
                />
                {zone && W.zoneWeathers[zone].map((x, i) => (
                  <span
                    key={i}
                    className={classNames('condition_weather-item', previousWeathers.indexOf(i) !== -1 && '-active')}
                    onClick={() => this.setState({ previousWeathers: [i] })}
                    onContextMenu={() => this.setState({ previousWeathers: toggleWeather(previousWeathers, i) })}
                    children={t(x)}
                  />
                ))}
              </span>
            </div>
            <div className="condition_time">
              <span className="condition-title">
                {t`Time`}
                <span className="condition-tip">{t`Click start time then select a range`}</span>
              </span>
              <div className="condition_time-selector">
                {Array.from({ length: 24 }, (x, i) => (
                  <span
                    key={i}
                    className={classNames(
                      'condition_time-item',
                      W.isHourIn(beginHour, endHour, i) && '-active',
                      hoverHour !== null && W.isHourIn(beginHour, hoverHour, i) && '-hover',
                    )}
                    onClick={() => {
                      if (hoverHour === null) {
                        this.setState({
                          beginHour: i,
                          endHour: i,
                          hoverHour: i,
                        });
                      } else {
                        this.setState({
                          endHour: i,
                          hoverHour: null,
                        });
                      }
                    }}
                    onMouseEnter={() => {
                      if (hoverHour !== null) {
                        this.setState({ hoverHour: i });
                      }
                    }}
                    children={i}
                  />
                ))}
              </div>
            </div>
          </>}
        </div>
        {matches.length > 1 && (
          <div className="console clearfix">
            <span className="console_summary">
              {format(t`Found {count} matches in next {future} earth days`,
                { future: W.future, count: matches.length })}
            </span>
          </div>
        )}
        {matches.length > 1 && (
          <div className="match">
            <table>
              <thead>
              <tr>
                <th className="match_local-time">{t`Local Time`}</th>
                <th className="match_eorzea-time">{t`Eorzea Time`}</th>
                <th className="match_weathers">{t`Weathers`}</th>
              </tr>
              </thead>
              <tbody>
              {matches.slice(0, showCount).map(x => x()).map((x, i) => (
                <tr key={i}>
                  <td className="match_local-time">
                    <span className="match_local-time-date">{strftime('%m/%d ', x.begin)}</span>
                    <FriendlyTime date={x.begin} />
                    <span className="match_local-time-separator">-</span>
                    <FriendlyTime date={x.end} />
                  </td>
                  <td className="match_eorzea-time">
                    <span className="match_eorzea-time-date">{formatEorzeaDate(x.begin)}</span>
                    {formatEorzeaTime(x.begin)}, {x.duration}h
                  </td>
                  <td className="match_weathers">
                    <Weathers weathers={x.weathers} max={4} />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        {matches.length === 1 && (
          <div className="console clearfix">
            <span className="console_summary">
              {t`Showing future weather list, select some conditions to query matched periods`}
            </span>
          </div>
        )}
        {matches.length === 1 && (
          <div className="match list">
            <table>
              <thead>
              <tr>
                <th />
                <th>ET 0:00</th>
                <th>ET 8:00</th>
                <th>ET 16:00</th>
              </tr>
              </thead>
              <tbody>
              {Array.from({ length: Math.min(showCount, Math.floor(list.length / 3)) },
                (x, i) => i * 3 - list[0]().begin.valueOf() / 2 % 3).map(i => (
                <tr key={i}>
                  <td className="match_list-date">{strftime('%m/%d', list[i < 0 ? 0 : i]().begin)}</td>
                  {[i, i + 1, i + 2].map(j => j >= 0 && list[j]()).map((x, j) => x ? (
                    <td key={j}>
                      <span className="match_list-time"><FriendlyTime date={x.begin} /></span>
                      <span className="match_list-weather">{t(x.weathers[1])}</span>
                    </td>
                  ) : <td key={j} />)}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        {showCount < (matches.length === 1 ? Math.floor(list.length / 3) : matches.length) && (
          <div className="more">
            <div className="more_button" onClick={() => this.setState({ showCount: showCount * 2 })}>
              {t`Show more`}
            </div>
          </div>
        )}
        <div className="footer">
          {t`FFXIV Weather Lookup`} 2201a
          <span className="footer_separator">·</span>
          <a href="https://github.com/Asvel/ffxiv-weather/blob/master/LICENSE.txt">{t`License`}</a>
          <span className="footer_separator">·</span>
          <a href="https://github.com/Asvel/ffxiv-weather">{t`Code`}</a>
        </div>
      </div>
    );
  }
  public componentDidMount() {
    W.init();  // improve first searching response speed
    window.addEventListener('hashchange', () => {
      if (formatHash(this.state) !== window.location.hash) {
        this.setState(parseHash(window.location.hash));
      }
    }, false);
  }
  public componentDidUpdate() {
    window.location.hash = formatHash(this.state);
  }
}

class FriendlyTime extends React.Component<{ date: Date }> {
  public render() {
    const { date } = this.props;
    return (
      <>
        <span>{strftime('%H:%M', date)}</span>
        <span className="friendly-time_seconds">{strftime(':%S', date)}</span>
      </>
    );
  }
}

interface WeathersProps {
  weathers: string[],
  max: number,
  className?: string,
}

class Weathers extends React.Component<WeathersProps> {
  public render() {
    let { weathers, max, className } = this.props;
    className = classNames(className, 'weathers');
    return weathers.length <= max ? (
      <span className={className}>
        {weathers.map((x, i) => (
          <span key={i}>{t(x)}</span>
        ))}
      </span>
    ) : (
      <span className={className}>
        {weathers.slice(0, max - 2).map((x, i) => (
          <span key={i}>{t(x)}</span>
        ))}
        <span>...</span>
        <span>{t(weathers[weathers.length - 1])}</span>
      </span>
    );
  }
}

const groupedZones: W.Zone[][] = [
  ['Limsa Lominsa', 'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea',
    'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea', 'The Mist'],
  ['Gridania', 'Central Shroud', 'East Shroud', 'South Shroud', 'North Shroud',
    'The Lavender Beds'],
  ['Ul\'dah', 'Western Thanalan', 'Central Thanalan', 'Eastern Thanalan',
    'Southern Thanalan', 'Northern Thanalan', 'The Goblet'],
  ['Ishgard', 'Coerthas Central Highlands', 'Coerthas Western Highlands'],
  ['The Sea of Clouds', 'Azys Lla', 'The Diadem'],
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
];

const zoneShorthands = {} as { [index in W.Zone]: string };
const shorthandZones = {} as { [index: string]: W.Zone };
(() => {
  const wordCounts: { [index: string]: number }[] = [{}, {}, {}];
  const shorthands = W.zones
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
  for (let i = 0; i < W.zones.length; i++) {
    zoneShorthands[W.zones[i]] = shorthands[i];
    shorthandZones[shorthands[i]] = W.zones[i];
  }
})();

const events = {
  garlok: {
    description: t`伽洛克 - 天气保持薄雾、碧空、晴朗、阴云200分钟时开始，不再是这些天气时结束。`,
    matcher: () => W
      .find({
        zone: 'Eastern La Noscea',
        desiredWeathers: [0, 1, 2, 3],
      })
      .map(m => {
        const match = m(true);
        match.begin.setMinutes(match.begin.getMinutes() + 200);
        return match;
      })
      .filter(m => m.begin < m.end),
  },
  laideronnette: {
    description: t`雷德罗巨蛇 - 天气保持小雨30分钟时开始，天气不再是小雨时结束。`,
    matcher: () => W
      .find({
        zone: 'Central Shroud',
        desiredWeathers: [1],
      })
      .map(m => {
        const match = m(true);
        match.begin.setMinutes(match.begin.getMinutes() + 30);
        return match;
      })
      .filter(m => m.begin < m.end),
  },
};

function parseHash(hash: string): Condition {
  const [ zone, desiredWeathers, previousWeathers, beginHour, endHour ] = hash.slice(1).split('-');
  return {
    event: zone in events ? zone as any : null,
    zone: shorthandZones[zone] || null,
    desiredWeathers: desiredWeathers ? desiredWeathers.split('').map(Number) : [],
    previousWeathers: previousWeathers ? previousWeathers.split('').map(Number) : [],
    beginHour: Number(beginHour || 0),
    endHour: Number(endHour || 23),
  };
}
function formatHash(condition: Condition): string {
  if (condition.event !== null) return '#' + condition.event;
  if (!condition.zone) return '';
  const zone = zoneShorthands[condition.zone];
  const desiredWeathers = condition.desiredWeathers.sort((a, b) => a - b).join('');
  const previousWeathers = condition.previousWeathers.sort((a, b) => a - b).join('');
  const parts = [zone, desiredWeathers, previousWeathers, condition.beginHour, condition.endHour];
  const defaults = [null, '', '', 0, 23];
  while (parts[parts.length - 1] === defaults[parts.length - 1]) parts.length--;
  return '#' + parts.join('-');
}

function toggleWeather(weathers: number[], weather: number): number[] {
  const index = weathers.indexOf(weather);
  if (index === -1) {
    return weathers.concat([weather]);
  } else {
    return weathers.slice(0, index).concat(weathers.slice(index + 1));
  }
}

const padZero = (n: number) => n < 10 ? '0' + n : n;
function formatEorzeaDate(date: Date): string {
  const dayCount = Math.floor(date.valueOf() / (1000 * 175 * 24));
  const day = dayCount % 32;
  const monthCount = Math.floor(dayCount / 32);
  const month = monthCount % 12;
  return `${padZero(month + 1)}/${padZero(day + 1)}`;
}
function formatEorzeaTime(date: Date): string {
  const minuteCount = Math.floor(date.valueOf() / (1000 * 175) * 60);
  const minute = minuteCount % 60;
  const hourCount = Math.floor(minuteCount / 60);
  const hour = hourCount % 24;
  return `${padZero(hour)}:${padZero(minute)}`;
}

document.title = t`FFXIV Weather Lookup`;

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
