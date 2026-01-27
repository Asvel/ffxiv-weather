import { createSignal, createSelector } from 'solid-js';
import * as i18n from '../i18n';
import { t } from '../i18n';

declare const __BUILD_DATE__: number;

export function Footer() {
  const [ getLanguageExpanded, setLanguageExpanded ] = createSignal(false);
  const isCurrentLanguage = createSelector(() => i18n.getCurrentLanguage());
  return (
    <div class="footer">
      {t`FFXIV Weather Lookup`} <span title={`发布于 ${new Date(__BUILD_DATE__).toLocaleString()}`}>2601a</span>
      <span class="footer_separator">·</span>
      <a class="footer_clickable" href="https://github.com/Asvel/ffxiv-weather#license">{t`License`}</a>
      <span class="footer_separator">·</span>
      <a class="footer_clickable" href="https://github.com/Asvel/ffxiv-weather">{t`Code`}</a>
      <span class="footer_separator">·</span>
      <span class="footer_clickable" onClick={() => setLanguageExpanded(!getLanguageExpanded())}>Language</span>
      {getLanguageExpanded() && (
        <div class="footer_language-list">
          {/*@once*/Object.entries(i18n.languages).map(([ lang, langName ]) => (
            <>
              <span
                class="footer_clickable"
                classList={{ '-active': isCurrentLanguage(lang) }}
                onClick={() => i18n.setCurrentLanguage(lang)}
                children={langName}
              />
              <span class="footer_separator">·</span>
            </>
          ))}
        </div>
      )}
    </div>
  );
}
