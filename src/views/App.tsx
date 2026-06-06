import { createEffect, Show } from 'solid-js';
import { t } from '../i18n';
import { Store } from '../store';
import { StoreContext } from './useStore';
import { Main } from './Main';
import { EventMain } from './EventMain';

export function App() {
  const store = Store.create();
  (window as any).store = store;
  createEffect(() => {
    document.documentElement.lang = t`en`;
  });
  createEffect(() => {
    let title = t`FFXIV Weather Lookup`;
    if (store.zone !== null) {
      title = `${t(store.zone)} - ${title}`;
    }
    document.title = title;

  });
  return (
    <StoreContext.Provider value={store}>
      <Show when={store.event} keyed fallback={<Main />}>
        {eventId => <EventMain eventId={eventId} />}
      </Show>
    </StoreContext.Provider>
  );
}
