import { createSelector } from 'solid-js';
import * as W from '../Weather';
import { t } from '../i18n';
import { indexRender } from '../utils';
import { useStore } from './useStore';

export function Condition() {
  const store = useStore();
  const isZoneSelected = createSelector(() => store.zone);
  return (
    <div class="condition">
      <div class="condition_zone">
        <span class="condition-title">
          {store.zone ? t`Zone` : t`Select Zone`}
        </span>
        {/*@once*/W.groupedZones.map(g => (
          <span class="condition_zone-group">
            {/*@once*/g.map(z => (
              <span
                class="condition_zone-item"
                classList={{ '-active': isZoneSelected(z) }}
                onClick={() => store.switchZone(z)}
                children={t(z)}
              />
            ))}
          </span>
        ))}
      </div>
      {store.zone && <>
        <div class="condition_weather">
          <span class="condition-title">
            {t`Weather`}
            <span class="condition-tip">{t`Right click to multiple select`}</span>
          </span>
          <span
            class="condition_weather-selector"
            onContextMenu={e => e.preventDefault()}
          >
            <span
              class="condition_weather-item"
              classList={{ '-active': store.desiredWeathers.size === 0 }}
              onClick={() => store.switchDesiredWeather('any', false)}
              onContextMenu={() => store.switchDesiredWeather('any', true)}
              children={t`Any`}
            />
            {store.zone && indexRender(() => W.zoneWeathers[store.zone!], (x, i) => (
              <span
                class="condition_weather-item"
                classList={{ '-active': store.desiredWeathers.has(i) }}
                onClick={() => store.switchDesiredWeather(i, false)}
                onContextMenu={() => store.switchDesiredWeather(i, true)}
                children={t(x())}
              />
            ))}
          </span>
        </div>
        <div class="condition_weather">
          <span class="condition-title">
            {t`Previous Weather`}
            <span class="condition-tip">{t`Right click to multiple select`}</span>
          </span>
          <span
            class="condition_weather-selector"
            onContextMenu={e => e.preventDefault()}
          >
            <span
              class="condition_weather-item"
              classList={{ '-active': store.previousWeathers.size === 0 }}
              onClick={() => store.switchPreviousWeathers('any', false)}
              onContextMenu={() => store.switchPreviousWeathers('any', true)}
              children={t`Any`}
            />
            {store.zone && indexRender(() => W.zoneWeathers[store.zone!], (x, i) => (
              <span
                class="condition_weather-item"
                classList={{ '-active': store.previousWeathers.has(i) }}
                onClick={() => store.switchPreviousWeathers(i, false)}
                onContextMenu={() => store.switchPreviousWeathers(i, true)}
                children={t(x())}
              />
            ))}
          </span>
        </div>
        <div class="condition_time">
          <span class="condition-title">
            {t`Time`}
            <span class="condition-tip">{t`Click start time then select a range`}</span>
          </span>
          <div class="condition_time-selector">
            {Array.from({ length: 24 }, (_, i) => store.selectingHour === null ? (
              <span
                class="condition_time-item"
                classList={{
                  '-active': W.isHourIn(store.beginHour, store.endHour, i),
                }}
                onClick={() => store.selectHourBound(i)}
                children={i}
              />
            ) : (
              <span
                class="condition_time-item"
                classList={{
                  '-active': i === store.selectingHour,
                  '-hover': W.isHourIn(store.selectingHour, store.hoverHour!, i),
                }}
                onClick={() => store.selectHourBound(i)}
                onMouseEnter={() => store.setHoverHour(i)}
                children={i}
              />
            ))}
          </div>
        </div>
      </>}
    </div>
  );
}
