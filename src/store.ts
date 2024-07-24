import { createEffect, batch } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { createLazyMemo } from '@solid-primitives/memo';
import * as W from './Weather';

export class Store {
  event: W.EventId | null = null;
  zone: W.Zone | null;
  desiredWeathers: number[];
  previousWeathers: number[];
  beginHour: number;
  endHour: number;
  selectingHour: number | null;
  hoverHour: number | null;
  shownLine: number;

  private constructor() {
    this.reset();

    window.setTimeout(W.init, 100);  // improve first searching response speed
  }
  static create() {  // eslint-disable-line @typescript-eslint/member-ordering
    const store: Store = createMutable(new Store() as any);
    for (const [ key, desc ] of Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(store)))) {
      if (key === 'constructor') continue;
      if (desc.get) {
        const get = createLazyMemo(desc.get.bind(store));
        // const get = createLazyMemo(() => { console.log(desc.get!.name); return desc.get!.apply(store); });
        Object.defineProperty(store, key, { get });
      }
      if (typeof desc.value === 'function') {
        const og = desc.value;
        const value = (...args: any[]) => batch(() => og.apply(store, args));
        Object.defineProperty(store, key, { value });
      }
    }

    store.hashString$ = window.location.hash;  // eslint-disable-line solid/reactivity
    createEffect(() => window.location.hash = store.hashString);
    window.addEventListener('hashchange', () => store.hashString$ = window.location.hash);  // eslint-disable-line solid/reactivity

    return store;
  }

  reset() {
    this.event = null;
    this.zone = null;
    this.desiredWeathers = [];
    this.previousWeathers = [];
    this.beginHour = 0;
    this.endHour = 23;
    this.selectingHour = null;
    this.hoverHour = null;
    this.shownLine = 12;
  }

  switchZone(zone: Store['zone']) {
    this.reset();
    this.zone = zone;
  }

  _switchWeather(target: 'desiredWeathers' | 'previousWeathers', weather: number | 'any', multiSelect: boolean) {
    if (weather === 'any') {
      this[target] = [];
    } else if (!multiSelect) {
      this[target] = [weather];
    } else {
      const index = this[target].indexOf(weather);
      if (index === -1) {
        this[target].push(weather);
      } else {
        this[target].splice(index, 1);
      }
    }
  }
  switchDesiredWeather(weather: number | 'any', multiSelect: boolean) {
    this._switchWeather('desiredWeathers', weather, multiSelect);
  }
  switchPreviousWeathers(weather: number | 'any', multiSelect: boolean) {
    this._switchWeather('previousWeathers', weather, multiSelect);
  }

  selectHourBound(hour: number) {
    if (this.selectingHour === null) {
      this.selectingHour = hour;
      this.hoverHour = hour;
    } else {
      this.beginHour = this.selectingHour;
      this.endHour = hour;
      this.selectingHour = null;
      this.hoverHour = null;
    }
  }
  setHoverHour(hour: number) {
    this.hoverHour = hour;
  }

  showMore() {
    this.shownLine *= 2;
  }

  get hashString(): string {
    if (this.event !== null) return '#' + this.event;
    if (!this.zone) return '';
    const zone = W.zoneShorthands[this.zone];
    const desiredWeathers = this.desiredWeathers.slice().sort((a, b) => a - b).join('');
    const previousWeathers = this.previousWeathers.slice().sort((a, b) => a - b).join('');
    const parts = [zone, desiredWeathers, previousWeathers, this.beginHour, this.endHour];
    const defaults = [null, '', '', 0, 23];
    while (parts[parts.length - 1] === defaults[parts.length - 1]) parts.length--;
    return '#' + parts.join('-');
  }
  set hashString$(value: string) {  // eslint-disable-line -- FIXME: remove the $ if solid mutable setter bug fixed
    if (value === this.hashString) return;
    const [ firstPart, desiredWeathers, previousWeathers, beginHour, endHour ] = value.slice(1).split('-');
    this.reset();
    if (firstPart in W.events) {
      this.event = firstPart as any;
    } else if (firstPart in W.shorthandZones) {
      this.zone = W.shorthandZones[firstPart];
      this.desiredWeathers = desiredWeathers ? desiredWeathers.split('').map(Number) : [];
      this.previousWeathers = previousWeathers ? previousWeathers.split('').map(Number) : [];
      this.beginHour = Number(beginHour || 0);
      this.endHour = Number(endHour || 23);
    }
  }

  get matches() {
    const { zone, desiredWeathers, previousWeathers, beginHour, endHour } = this;
    return zone !== null ? W.find({ zone, desiredWeathers, previousWeathers, beginHour, endHour }) : [];
  }
  get shownMatches() {
    return this.matches
      .slice(this.nonpastIndex, this.shownLine)
      .map(m => (m as any).value ??= m());
  }
  get nonpastIndex() {  // for matches
    const now = new Date();
    let index = 0;
    while (index < this.matches.length && this.matches[index]().end < now) index++;
    return index;
  }

  get list() {
    const { zone } = this;
    return zone !== null ? W.find({ zone, hourMask: { 0: true, 8: true, 16: true } }) : [];
  }
  get shownList() {
    return this.list
      .slice(0, this.shownLine * 3)
      .map(m => (m as any).value ??= m());
  }
  get nowIndex() {  // for list
    if (this.list.length === 0) return 0;
    const earliest = this.list[0]().begin.valueOf();
    const distance = Date.now() - earliest;
    return Math.floor(distance / W.weatherDuration);
  }
}
