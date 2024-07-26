import { t } from '../i18n';

export function WeatherSequence(props: { weathers: string[], max: number }) {
  return (
    <span class="weathers">
      {props.weathers.length <= props.max ? (
        props.weathers.map(x => (
          <span>{t(x)}</span>
        ))
      ) : (<>
        {/*@once*/props.weathers.slice(0, props.max - 2).map(x => (
          <span>{t(x)}</span>
        ))}
        <span><span class="weather-sequence_ellipsis">...</span></span>
        <span>{t(props.weathers[props.weathers.length - 1])}</span>
      </>)}
    </span>
  );
}
