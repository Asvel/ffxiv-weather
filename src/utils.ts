import {
  createEffect, createMemo,
  createRoot,
  getOwner, runWithOwner,
  mapArray, indexArray,
  type Accessor, type JSX,
} from 'solid-js';

export function format(template: string, args: { [index: string]: string | number }): string {
  return template.replace(/{(\w+)}/g, (match, key) => args[key] as string);
}

export function formatDateMD(date: Date): string {
  return `${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`;
}
export function formatTimeHM(date: Date): string {
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}
export function formatTimeS(date: Date): string {
  return `:${padZero(date.getSeconds())}`;
}
export function formatEorzeaDate(date: Date): string {
  const dayCount = Math.floor(date.valueOf() / (1000 * 175 * 24));
  const day = dayCount % 32;
  const monthCount = Math.floor(dayCount / 32);
  const month = monthCount % 12;
  return `${padZero(month + 1)}/${padZero(day + 1)}`;
}
export function formatEorzeaTime(date: Date): string {
  const minuteCount = Math.floor(date.valueOf() / (1000 * 175) * 60);
  const minute = minuteCount % 60;
  const hourCount = Math.floor(minuteCount / 60);
  const hour = hourCount % 24;
  return `${padZero(hour)}:${padZero(minute)}`;
}
const padZero = (n: number) => n < 10 ? '0' + n : n;

const owner = createRoot(() => getOwner());
export const createEffectGlobal: typeof createEffect = (fn: any) => runWithOwner(owner, () => createEffect(fn));

export function mapRender<T extends readonly any[], U extends JSX.Element>(
  list: Accessor<T>, mapFn: (item: T[number], index: Accessor<number>) => U) {
  return createMemo(mapArray(list, mapFn)) as unknown as JSX.Element;  // eslint-disable-line solid/reactivity
}
export function indexRender<T extends readonly any[], U extends JSX.Element>(
  list: Accessor<T>, mapFn: (item: Accessor<T[number]>, index: number) => U) {
  return createMemo(indexArray(list, mapFn)) as unknown as JSX.Element;  // eslint-disable-line solid/reactivity
}
