import { createMemo } from 'solid-js';
import * as W from '../Weather';
import { t, getCurrentLanguage } from '../i18n';
import { indexRender, formatDateMD } from '../utils';
import { FriendlyTime } from './FriendlyTime';
import { Footer } from './Footer';

export function EventMain({ eventId }: { eventId: W.EventId }) {  // eslint-disable-line solid/no-destructure
  const event = W.events[eventId];
  const matches = event.matcher().slice(0, 20);
  const forceUtc8 = () => getCurrentLanguage() === 'zh';
  return (
    <div class="app">
      <div class="console clearfix">
        <span class="console_summary">{t(event.description)}</span>
        {forceUtc8() && <span class="console_timezone">UTC+08:00</span>}
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
          {indexRender(createMemo(() => forceUtc8()  // eslint-disable-line solid/reactivity
            ? matches.map(m => ({ begin: shiftDateAsUtc8(m.begin), end: shiftDateAsUtc8(m.end) }))
            : matches), m => (
            <tr>
              <td class="match_event-start-time">
                <span class="match_local-time-date">{formatDateMD(m().begin)} </span>
                <FriendlyTime date={m().begin} />
              </td>
              <td class="match_event-end-time">
                <span class="match_local-time-date">{formatDateMD(m().end)} </span>
                <FriendlyTime date={m().end} />
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

function shiftDateAsUtc8(date: Date) {
  const timestamp = date.getTime();
  const shifted = new Date(timestamp + (date.getTimezoneOffset() + 480) * 60000);
  shifted.setTime(timestamp + (shifted.getTimezoneOffset() + 480) * 60000);  // might cross DST boundary
  return shifted;
}
