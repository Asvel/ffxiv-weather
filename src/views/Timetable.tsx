import * as mobxReact from 'mobx-react-lite';
import * as strftime from 'strftime';
import * as classNames from 'classnames';
import { t } from '../i18n';
import { useStore } from './useStore';
import { FriendlyTime } from './FriendlyTime';
import { ShowMore } from './ShowMore';

export const Timetable = mobxReact.observer(() => {
  const store = useStore();
  return (
    <>
      <div className="console clearfix">
        <span className="console_summary">
          {t`Showing future weather list, select some conditions to query matched periods`}
        </span>
      </div>
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
          {Array.from({ length: store.shownList.length / 3 }).map((_, i) => i * 3).map(i => (
            <tr key={i}>
              <td className={classNames('match_list-date', i + 2 < store.nowIndex && 'match_list-past')}>
                {strftime('%m/%d', store.shownList[i].begin)}
              </td>
              {[i, i + 1, i + 2].map(j => (
                <td
                  key={j}
                  className={classNames(
                    j < store.nowIndex && 'match_list-past',
                    j === store.nowIndex && 'match_list-current',
                  )}
                >
                  <span className="match_list-time"><FriendlyTime date={store.shownList[j].begin} /></span>
                  <span className="match_list-weather">{t(store.shownList[j].weathers[1])}</span>
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
});
