import * as W from '../Weather';
import { t } from '../i18n';
import { format, formatDateMD, formatEorzeaDate, formatEorzeaTime, mapRender } from '../utils';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { WeatherSequence } from './WeatherSequence';
import { ShowMore } from './ShowMore';

export function Matches() {
  const store = useStore();
  return (
    <>
      <div class="console clearfix">
        <span class="console_summary">
          {format(t`Found {count} matches in next {future} earth days`,
            { future: W.future, count: store.matches.length })}
        </span>
      </div>
      <div class="match">
        <table>
          <thead>
          <tr>
            <th class="match_local-time">{t`Local Time`}</th>
            <th class="match_eorzea-time">{t`Eorzea Time`}</th>
            <th class="match_weathers">{t`Weathers`}</th>
          </tr>
          </thead>
          <tbody>
          {mapRender(() => store.shownMatches, ({ begin, duration, end, weathers }) => (  // eslint-disable-line solid/no-destructure
            <tr>
              <td class="match_local-time">
                <span class="match_local-time-date">{/*@once*/formatDateMD(begin)} </span>
                <FriendlyTime date={begin} />
                <span class="match_local-time-separator">-</span>
                <FriendlyTime date={end} />
              </td>
              <td class="match_eorzea-time">
                <span class="match_eorzea-time-date">{/*@once*/formatEorzeaDate(begin)}</span>
                {/*@once*/formatEorzeaTime(begin)}, {duration}h
              </td>
              <td class="match_weathers">
                <WeatherSequence weathers={weathers} max={4} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {store.shownLine < store.matches.length && <ShowMore />}
    </>
  );
}
