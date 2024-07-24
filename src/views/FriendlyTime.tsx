import strftime = require('strftime');

export function FriendlyTime(props: { date: Date }) {
  return (
    <>
      <span>{strftime('%H:%M', props.date)}</span>
      <span class="friendly-time_seconds">{strftime(':%S', props.date)}</span>
    </>
  );
}
