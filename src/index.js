import React from 'react';
import ReactDOM from 'react-dom';
import strftime from 'strftime';
import classNames from 'classnames';
import W from './Weather';
import langs from './langs/zh-CN';
import 'normalize.css';
import './app.css';

let _t = s => langs[s] || s;
// _t = s => s;
const format = (template, args) => template.replace(/{(\w+)}/g, (match, key) => args[key]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      zone: null,
      desiredWeathers: [],
      previousWeathers: [],
      beginHour: 0,
      endHour: 23,
      hoverHour: null,
    };
    this.state = {
      ...this.initialState,

      ...JSON.parse(window.localStorage.getItem('state') || '{}'),
    };
  }
  render() {
    let { zone, desiredWeathers, previousWeathers, beginHour, endHour, hoverHour } = this.state;
    let matches = zone && W.find({ zone, desiredWeathers, previousWeathers, beginHour, endHour });
    let list = zone && matches.length === 1 && W.find({ zone, hourMask: { 0: true, 8: true, 16: true } });
    return (
      <div className="app">
        <div className="condition">
          <div className="condition_zone">
            <span className="condition-title">
              {_t(zone ? 'Zone' : '请选择一个地区')}
            </span>
            {zones.map((g, i) => (
              <span key={i} className="condition_zone-group">
                {g.map(z => (
                  <span
                    key={z}
                    className={classNames('condition_zone-item', zone === z && '-active')}
                    onClick={() => this.setState({ ...this.initialState, zone: z })}
                    children={_t(z)}
                  />
                ))}
              </span>
            ))}
          </div>
          {zone && <React.Fragment>
            <div className="condition_weather">
              <span className="condition-title">{_t('Weather')}</span>
              <span className="condition_weather-selector">
                <span
                  className={classNames('condition_weather-item', desiredWeathers.length === 0 && '-active')}
                  onClick={() => this.setState({ desiredWeathers: [] })}
                  children={_t('Any')}
                />
                {zone && W.zones[zone].map((x, i) => (
                  <span
                    key={i}
                    className={classNames('condition_weather-item', desiredWeathers.indexOf(i) !== -1 && '-active')}
                    onClick={() => this.setState({ desiredWeathers: toggleWeather(desiredWeathers, i) })}
                    onContextMenu={e => { this.setState({ desiredWeathers: [i] }); e.preventDefault(); }}
                    children={_t(x)}
                  />
                ))}
              </span>
            </div>
            <div className="condition_weather">
              <span className="condition-title">{_t('Previous Weather')}</span>
              <span className="condition_weather-selector">
                <span
                  className={classNames('condition_weather-item', previousWeathers.length === 0 && '-active')}
                  onClick={() => this.setState({ previousWeathers: [] })}
                  children={_t('Any')}
                />
                {zone && W.zones[zone].map((x, i) => (
                  <span
                    key={i}
                    className={classNames('condition_weather-item', previousWeathers.indexOf(i) !== -1 && '-active')}
                    onClick={() => this.setState({ previousWeathers: toggleWeather(previousWeathers, i) })}
                    onContextMenu={e => { this.setState({ previousWeathers: [i] }); e.preventDefault(); }}
                    children={_t(x)}
                  />
                ))}
              </span>
            </div>
            <div className="condition_time">
              <span className="condition-title">{_t('Time')}</span>
              <div className="condition_time-selector">
                {hours.map(x => (
                  <span
                    key={x}
                    className={classNames(
                      'condition_time-item',
                      W.isHourIn(beginHour, endHour, x) && '-active',
                      hoverHour !== null && W.isHourIn(beginHour, hoverHour, x) && '-hover'
                    )}
                    onClick={() => {
                      if (hoverHour === null) {
                        this.setState({
                          beginHour: x,
                          endHour: x,
                          hoverHour: x,
                        });
                      } else {
                        this.setState({
                          endHour: x,
                          hoverHour: null,
                        });
                      }
                    }}
                    onMouseEnter={() => {
                      if (hoverHour !== null) {
                        this.setState({ hoverHour: x });
                      }
                    }}
                    children={x}
                  />
                ))}
              </div>
            </div>
          </React.Fragment>}
        </div>

        {matches && matches.length > 1 && (
          <div className="console clearfix">
            <span className="console_summary">
              {format(_t('未来 {future} 地球天内共有 {count} 个时段符合条件'),
                { future: W.future, count: matches.length })}
            </span>
          </div>
        )}
        {matches && matches.length > 1 && (
          <div className="match">
            <table>
              <thead>
              <tr>
                <th className="match_begin">{_t('Begin Time')}</th>
                <th className="match_end">{_t('End Time')}</th>
                <th className="match_duration">{_t('Duration')}</th>
                <th className="match_weathers">{_t('Weathers')}</th>
              </tr>
              </thead>
              <tbody>
              {matches.slice(0, 11).map(x => x()).map((x, i) => (
                <tr key={i}>
                  <td className="match_begin">{strftime('%m-%d %H:%M:%S', x.begin)}</td>
                  <td className="match_end">{strftime('%m-%d %H:%M:%S', x.end)}</td>
                  <td className="match_duration">{x.duration} ET</td>
                  <td className="match_weathers">
                    <Weathers weathers={x.weathers} max={4} />
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        {matches && matches.length === 1 && (
          <div className="console clearfix">
            <span className="console_summary">
              {_t('正在展示未来的天气序列，选择一些条件可以查询符合的时段')}
            </span>
          </div>
        )}
        {matches && matches.length === 1 && (
          <div className="match">
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
              {Array.from({ length: 11 }, (x, i) => i * 3 - list[0]().begin / 2 % 3).map(i => (
                <tr key={i}>
                  <td>{strftime('%m-%d', list[i < 0 ? 0 : i]().begin)}</td>
                  {[i, i + 1, i + 2].map(j => j >= 0 && list[j]()).map((x, j) => x ? (
                    <td key={j}>{strftime('%H:%M:%S', x.begin)} {_t(x.weathers[1])}</td>
                  ) : <td key={j} />)}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  componentDidUpdate() {
    window.localStorage.setItem('state', JSON.stringify(this.state));
  }
}

class Weathers extends React.Component {
  render() {
    let { weathers, max, className } = this.props;
    className = classNames(className, "weathers");
    return weathers.length <= max ? (
      <span className={className}>
        {weathers.map((x, i) => (
          <span key={i}>{_t(x)}</span>
        ))}
      </span>
    ) : (
      <span className={className}>
        {weathers.slice(0, max - 2).map((x, i) => (
          <span key={i}>{_t(x)}</span>
        ))}
        <span>...</span>
        <span>{_t(weathers[weathers.length - 1])}</span>
      </span>
    );
  }
}

const zones = [
  ["Limsa Lominsa", "Middle La Noscea", "Lower La Noscea", "Eastern La Noscea",
    "Western La Noscea", "Upper La Noscea", "Outer La Noscea", "The Mist"],
  ["Gridania", "Central Shroud", "East Shroud", "South Shroud", "North Shroud",
    "The Lavender Beds"],
  ["Ul'dah", "Western Thanalan", "Central Thanalan", "Eastern Thanalan",
    "Southern Thanalan", "Northern Thanalan", "The Goblet"],
  ["Ishgard", "Coerthas Central Highlands", "Coerthas Western Highlands"],
  ["The Sea of Clouds", "Azys Lla", "The Diadem"],
  ["Idyllshire", "The Dravanian Forelands", "The Dravanian Hinterlands", "The Churning Mists"],
  ["Rhalgr's Reach", "The Fringes", "The Peaks", "The Lochs"],
  ["Kugane", "Shirogane"],
  ["The Ruby Sea", "Yanxia", "The Azim Steppe"],
  ["Mor Dhona"],
];

function toggleWeather(weathers, weather) {
  let index = weathers.indexOf(weather);
  if (index === -1) {
    return weathers.concat([weather]);
  } else {
    return weathers.slice(0, index).concat(weathers.slice(index + 1));
  }
}

const hours = Array.from({ length: 24 }, (x, i) => i);

let container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App />, container);
