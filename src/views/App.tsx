import { Show } from 'solid-js';
import { Store } from '../store';
import { StoreContext } from './useStore';
import { Main } from './Main';
import { EventMain } from './EventMain';

export function App() {
  const store = Store.create();
  (window as any).store = store;
  return (
    <StoreContext.Provider value={store}>
      <Show when={store.event} keyed fallback={<Main />}>
        {eventId => <EventMain eventId={eventId} />}
      </Show>
    </StoreContext.Provider>
  );
}
