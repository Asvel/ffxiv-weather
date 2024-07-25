import { formatTimeHM, formatTimeS } from '../utils';

export function FriendlyTime(props: { date: Date }) {
  return (
    <>
      <span>{formatTimeHM(props.date)}</span>
      <span class="friendly-time_seconds">{formatTimeS(props.date)}</span>
    </>
  );
}
