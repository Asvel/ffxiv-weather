import * as mobx from 'mobx';
import * as W from './Weather';

export class Store {
  event: keyof typeof W.events | null = null;
  zone: W.Zone | null;
  desiredWeathers: number[];
  previousWeathers: number[];
  beginHour: number;
  endHour: number;
  hoverHour: number | null;
  showCount: number;

  constructor() {
    this.reset();
    mobx.makeAutoObservable(this);

    mobx.reaction(() => observableHash.get(), () => this.hashString = observableHash.get(), { fireImmediately: true });
    mobx.reaction(() => this.hashString, () => observableHash.set(this.hashString));

    window.setTimeout(W.init, 100);  // improve first searching response speed
  }

  reset() {
    this.event = null;
    this.zone = null;
    this.desiredWeathers = [];
    this.previousWeathers = [];
    this.beginHour = 0;
    this.endHour = 23;
    this.hoverHour = null;
    this.showCount = 11;
  }

  switchZone(zone: Store['zone']) {
    this.reset();
    this.zone = zone;
  }

  #switchWeather(target: 'desiredWeathers' | 'previousWeathers', weather: number | 'any', multiSelect: boolean) {
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
    this.#switchWeather('desiredWeathers', weather, multiSelect);
  }
  switchPreviousWeathers(weather: number | 'any', multiSelect: boolean) {
    this.#switchWeather('previousWeathers', weather, multiSelect);
  }

  selectHourBound(hour: number) {
    if (this.hoverHour === null) {
      this.beginHour = hour;
      this.endHour = hour;
      this.hoverHour = hour;
    } else {
      this.endHour = hour;
      this.hoverHour = null;
    }
  }
  setHoverHour(hour: number) {
    this.hoverHour = hour;
  }

  showMore() {
    this.showCount *= 2;
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
  set hashString(value: string) {
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
}

const observableHash = mobx.observable.box(window.location.hash);
mobx.reaction(() => observableHash.get(), () => window.location.hash = observableHash.get());
window.addEventListener('hashchange', mobx.action(() => observableHash.set(window.location.hash)), false);
