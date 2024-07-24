import { createContext, useContext } from 'solid-js';
import type { Store } from '../store';

export const StoreContext = createContext<Store>();
export function useStore(): Store {
  return useContext(StoreContext)!;
}
