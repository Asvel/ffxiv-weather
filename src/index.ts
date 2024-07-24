import { render } from 'solid-js/web';
import * as W from './Weather';
import { createEffectGlobal } from './utils';
import { t } from './i18n';
import { App } from './views/App';
import 'normalize.css';
import './app.css';

createEffectGlobal(() => {
  document.title = t`FFXIV Weather Lookup`;
});

const container = document.createElement('div');
document.body.appendChild(container);
render(App, container);

(window as any).weather = W;
console.log('You can access window.store for data store of this app, and window.weather for game related things.');
