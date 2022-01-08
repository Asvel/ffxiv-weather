import * as mobxReact from 'mobx-react-lite';
import type { Store } from '../store';
import { StoreContext } from './useStore';
import { Main } from './Main';
import { EventMain } from './EventMain';

export const App = mobxReact.observer<{ store: Store }>(({ store }) => {
  return (
    <StoreContext.Provider value={store}>
      {store.event === null ? <Main /> : <EventMain />}
    </StoreContext.Provider>
  );
});
