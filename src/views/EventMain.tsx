import strftime = require('strftime');
import * as W from '../Weather';
import { t, getCurrentLanguage } from '../i18n';
import { FriendlyTime } from './FriendlyTime';
import { Footer } from './Footer';

export function EventMain({ eventId }: { eventId: W.EventId }) {  // eslint-disable-line solid/no-destructure
  const event = W.events[eventId];
  const matches = event.matcher();
  const forceUtc8 = getCurrentLanguage() === 'zh';
  const strftimeT = forceUtc8 ? strftime.timezone(+480) : strftime;
  return (
    <div class="app">
      <div class="console clearfix">
        <span class="console_summary">{t(event.description)}</span>
        {forceUtc8 && <span class="console_timezone">UTC+08:00</span>}
      </div>
      <div class="match">
        <table>
          <thead>
          <tr>
            <th class="match_event-start-time">{t`Start Time`}</th>
            <th class="match_event-end-time">{t`End Time`}</th>
          </tr>
          </thead>
          <tbody>
          {/*@once*/matches.slice(0, 20).map(({ begin, end }) => (  // eslint-disable-line solid/no-destructure
            <tr>
              <td class="match_event-start-time">
                <span class="match_local-time-date">{/*@once*/strftimeT('%m/%d ', begin)}</span>
                <FriendlyTime date={begin} />
              </td>
              <td class="match_event-end-time">
                <span class="match_local-time-date">{/*@once*/strftimeT('%m/%d ', end)}</span>
                <FriendlyTime date={end} />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
