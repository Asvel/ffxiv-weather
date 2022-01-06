
export function format(template: string, args: { [index: string]: string | number }): string {
  return template.replace(/{(\w+)}/g, (match, key) => args[key] as string);
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
