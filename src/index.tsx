import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import * as W from './Weather';
import { t } from './i18n';
import { Store } from './store';
import { App } from './views/App';
import 'normalize.css';
import './app.css';

mobx.autorun(() => {
  document.title = t`FFXIV Weather Lookup`;
})

const store = new Store();
const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={store} />, container);

Object.defineProperty(window, 'store', {
  get value() {
    mobx.configure({ enforceActions: 'never' });
    return store;
  },
});
(window as any).weather = W;
console.log('You can access window.store for data store of this app, and window.weather for game related things.');
