import * as ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import { t } from './i18n';
import { Store } from './store';
import { App } from './views/App';
import 'normalize.css';
import './app.css';

mobx.autorun(() => {
  document.title = t`FFXIV Weather Lookup`;
})

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App store={new Store()} />, container);
