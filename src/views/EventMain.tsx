import * as mobxReact from 'mobx-react-lite';
import * as strftime from 'strftime';
import * as W from '../Weather';
import { t, getCurrentLanguage } from '../i18n';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { Footer } from "./Footer";

export const EventMain = mobxReact.observer(() => {
  const event = W.events[useStore().event!];
  const matches = event.matcher();
  const forceUtc8 = getCurrentLanguage() === 'zh';
  const strftimeT = forceUtc8 ? strftime.timezone(+480) : strftime;
  return (
    <div className="app">
      <div className="console clearfix">
        <span className="console_summary">{t(event.description)}</span>
        {getCurrentLanguage() === 'zh' && <span className="console_timezone">UTC+08:00</span>}
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
                <span className="match_local-time-date">{strftimeT('%m/%d ', x.begin)}</span>
                <FriendlyTime date={x.begin} />
              </td>
              <td className="match_event-end-time">
                <span className="match_local-time-date">{strftimeT('%m/%d ', x.end)}</span>
                <FriendlyTime date={x.end} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
});
