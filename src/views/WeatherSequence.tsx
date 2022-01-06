import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import * as classNames from 'classnames';
import { t } from '../i18n';

export const WeatherSequence = mobxReact.observer<{
  weathers: string[],
  max: number,
  className?: string,
}>(({ weathers, max, className }) => {
  className = classNames(className, 'weathers');
  return weathers.length <= max ? (
    <span className={className}>
      {weathers.map((x, i) => (
        <span key={i}>{t(x)}</span>
      ))}
    </span>
  ) : (
    <span className={className}>
      {weathers.slice(0, max - 2).map((x, i) => (
        <span key={i}>{t(x)}</span>
      ))}
      <span>...</span>
      <span>{t(weathers[weathers.length - 1])}</span>
    </span>
  );
});
