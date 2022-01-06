import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import * as strftime from 'strftime';
import * as classNames from 'classnames';
import * as W from '../Weather';
import * as utils from '../utils';
import { t } from '../i18n';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { WeatherSequence } from './WeatherSequence';
import { Footer } from './Footer';

export const Main = mobxReact.observer(() => {
  const store = useStore();
  const { zone, desiredWeathers, previousWeathers, beginHour, endHour, hoverHour, showCount } = store;
  const matches = zone ? W.find({ zone, desiredWeathers, previousWeathers, beginHour, endHour }) : [];
  const list = zone && matches.length === 1 ? W.find({ zone, hourMask: { 0: true, 8: true, 16: true } }) : [];
  return (
    <div className="app">
      <div className="condition">
        <div className="condition_zone">
          <span className="condition-title">
            {zone ? t`Zone` : t`Select Zone`}
          </span>
          {W.groupedZones.map((g, i) => (
            <span key={i} className="condition_zone-group">
              {g.map(z => (
                <span
                  key={z}
                  className={classNames('condition_zone-item', zone === z && '-active')}
                  onClick={() => store.switchZone(z)}
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
                onClick={() => store.switchDesiredWeather('any', false)}
                onContextMenu={() => store.switchDesiredWeather('any', true)}
                children={t`Any`}
              />
              {zone && W.zoneWeathers[zone].map((x, i) => (
                <span
                  key={i}
                  className={classNames('condition_weather-item', desiredWeathers.indexOf(i) !== -1 && '-active')}
                  onClick={() => store.switchDesiredWeather(i, false)}
                  onContextMenu={() => store.switchDesiredWeather(i, true)}
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
                onClick={() => store.switchPreviousWeathers('any', false)}
                onContextMenu={() => store.switchPreviousWeathers('any', true)}
                children={t`Any`}
              />
              {zone && W.zoneWeathers[zone].map((x, i) => (
                <span
                  key={i}
                  className={classNames('condition_weather-item', previousWeathers.indexOf(i) !== -1 && '-active')}
                  onClick={() => store.switchPreviousWeathers(i, false)}
                  onContextMenu={() => store.switchPreviousWeathers(i, true)}
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
                  onClick={() => store.selectHourBound(i)}
                  onMouseEnter={hoverHour === null ? undefined : () => store.setHoverHour(i)}
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
            {utils.format(t`Found {count} matches in next {future} earth days`,
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
                  <span className="match_eorzea-time-date">{utils.formatEorzeaDate(x.begin)}</span>
                  {utils.formatEorzeaTime(x.begin)}, {x.duration}h
                </td>
                <td className="match_weathers">
                  <WeatherSequence weathers={x.weathers} max={4} />
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
          <div className="more_button" onClick={() => store.showMore()}>
            {t`Show more`}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
});
