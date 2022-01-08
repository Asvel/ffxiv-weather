import * as mobxReact from 'mobx-react-lite';
import * as classNames from 'classnames';
import * as W from '../Weather';
import { t } from '../i18n';
import { useStore } from './useStore';

export const Condition = mobxReact.observer(() => {
  const store = useStore();
  const { zone, desiredWeathers, previousWeathers, beginHour, endHour, hoverHour } = store;
  return (
    <div className="condition">
      <div className="condition_zone">
        <span className="condition-title">
          {zone ? t`Zone` : t`Select Zone`}
        </span>
        {W.groupedZones.map((g, i) => (
          <span key={i} className="condition_zone-group">
            {g.map(z => (
              <span
                key={z}
                className={classNames('condition_zone-item', zone === z && '-active')}
                onClick={() => store.switchZone(z)}
                children={t(z)}
              />
            ))}
          </span>
        ))}
      </div>
      {zone && <>
        <div className="condition_weather">
          <span className="condition-title">
            {t`Weather`}
            <span className="condition-tip">{t`Right click to multiple select`}</span>
          </span>
          <span
            className="condition_weather-selector"
            onContextMenu={e => e.preventDefault()}
          >
            <span
              className={classNames('condition_weather-item', desiredWeathers.length === 0 && '-active')}
              onClick={() => store.switchDesiredWeather('any', false)}
              onContextMenu={() => store.switchDesiredWeather('any', true)}
              children={t`Any`}
            />
            {zone && W.zoneWeathers[zone].map((x, i) => (
              <span
                key={i}
                className={classNames('condition_weather-item', desiredWeathers.indexOf(i) !== -1 && '-active')}
                onClick={() => store.switchDesiredWeather(i, false)}
                onContextMenu={() => store.switchDesiredWeather(i, true)}
                children={t(x)}
              />
            ))}
          </span>
        </div>
        <div className="condition_weather">
          <span className="condition-title">
            {t`Previous Weather`}
            <span className="condition-tip">{t`Right click to multiple select`}</span>
          </span>
          <span
            className="condition_weather-selector"
            onContextMenu={e => e.preventDefault()}
          >
            <span
              className={classNames('condition_weather-item', previousWeathers.length === 0 && '-active')}
              onClick={() => store.switchPreviousWeathers('any', false)}
              onContextMenu={() => store.switchPreviousWeathers('any', true)}
              children={t`Any`}
            />
            {zone && W.zoneWeathers[zone].map((x, i) => (
              <span
                key={i}
                className={classNames('condition_weather-item', previousWeathers.indexOf(i) !== -1 && '-active')}
                onClick={() => store.switchPreviousWeathers(i, false)}
                onContextMenu={() => store.switchPreviousWeathers(i, true)}
                children={t(x)}
              />
            ))}
          </span>
        </div>
        <div className="condition_time">
          <span className="condition-title">
            {t`Time`}
            <span className="condition-tip">{t`Click start time then select a range`}</span>
          </span>
          <div className="condition_time-selector">
            {Array.from({ length: 24 }, (x, i) => (
              <span
                key={i}
                className={classNames(
                  'condition_time-item',
                  W.isHourIn(beginHour, endHour, i) && '-active',
                  hoverHour !== null && W.isHourIn(beginHour, hoverHour, i) && '-hover',
                )}
                onClick={() => store.selectHourBound(i)}
                onMouseEnter={hoverHour === null ? undefined : () => store.setHoverHour(i)}
                children={i}
              />
            ))}
          </div>
        </div>
      </>}
    </div>
  );
});
