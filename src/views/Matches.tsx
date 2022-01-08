import * as mobxReact from 'mobx-react-lite';
import * as strftime from 'strftime';
import * as W from '../Weather';
import * as utils from '../utils';
import { t } from '../i18n';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { WeatherSequence } from './WeatherSequence';
import { ShowMore } from './ShowMore';

export const Matches = mobxReact.observer(() => {
  const store = useStore();
  return (
    <>
      <div className="console clearfix">
        <span className="console_summary">
          {utils.format(t`Found {count} matches in next {future} earth days`,
            { future: W.future, count: store.matches.length })}
        </span>
      </div>
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
          {store.shownMatches.map((x, i) => (
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
      {store.shownLine < store.matches.length && <ShowMore />}
    </>
  );
});
