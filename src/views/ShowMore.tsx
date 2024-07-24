import { t } from '../i18n';
import { useStore } from './useStore';

export function ShowMore() {
  const store = useStore();
  return (
    <div class="more">
      <div class="more_button" onClick={() => store.showMore()}>
        {t`Show more`}
      </div>
    </div>
  );
}
