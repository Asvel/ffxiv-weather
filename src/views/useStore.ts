import * as React from 'react';
import type { Store } from '../store';

export const StoreContext = React.createContext<Store>(undefined as any);
export function useStore(): Store {
  return React.useContext(StoreContext);
}
