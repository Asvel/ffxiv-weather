import strftime = require('strftime');
import { t } from '../i18n';
import { mapRender } from '../utils';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { ShowMore } from './ShowMore';

export function Timetable() {
  const store = useStore();
  return (
    <>
      <div class="console clearfix">
        <span class="console_summary">
          {t`Showing future weather list, select some conditions to query matched periods`}
        </span>
      </div>
      <div class="match list">
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
          {mapRender(() => Array.from({ length: store.shownList.length / 3 }, (_, i) => i * 3), i => (
            <tr>
              <td class="match_list-date" classList={{ 'match_list-past': i + 2 < store.nowIndex }}>
                {strftime('%m/%d', store.shownList[i].begin)}
              </td>
              {/*@once*/[i, i + 1, i + 2].map(j => (
                <td classList={{ 'match_list-past': j < store.nowIndex, 'match_list-current': j === store.nowIndex }}>
                  <span class="match_list-time"><FriendlyTime date={store.shownList[j].begin} /></span>
                  <span class="match_list-weather">{t(store.shownList[j].weathers[1])}</span>
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {store.shownLine < Math.floor(store.list.length / 3) && <ShowMore />}
    </>
  );
}
