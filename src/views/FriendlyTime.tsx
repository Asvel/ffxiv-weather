import * as strftime from 'strftime';

export function FriendlyTime({ date }: { date: Date }) {
  return (
    <>
      <span>{strftime('%H:%M', date)}</span>
      <span className="friendly-time_seconds">{strftime(':%S', date)}</span>
    </>
  );
}
