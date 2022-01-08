import * as mobxReact from 'mobx-react-lite';
import { t } from '../i18n';
import { useStore } from './useStore';

export const ShowMore = mobxReact.observer(() => {
  const store = useStore();
  return (
    <div className="more">
      <div className="more_button" onClick={() => store.showMore()}>
        {t`Show more`}
      </div>
    </div>
  );
});
