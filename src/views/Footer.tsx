import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import * as classNames from 'classnames';
import * as i18n from '../i18n';
import { t } from '../i18n';

export const Footer = mobxReact.observer(() => {
  const [ languageExpanded, setLanguageExpanded ] = React.useState(false);
  return (
    <div className="footer">
      {t`FFXIV Weather Lookup`} 2208a
      <span className="footer_separator">·</span>
      <a className="footer_clickable" href="https://github.com/Asvel/ffxiv-weather#license">{t`License`}</a>
      <span className="footer_separator">·</span>
      <a className="footer_clickable" href="https://github.com/Asvel/ffxiv-weather">{t`Code`}</a>
      <span className="footer_separator">·</span>
      <span className="footer_clickable" onClick={() => setLanguageExpanded(!languageExpanded)}>Language</span>
      {languageExpanded && (
        <div className="footer_language-list">
          {Object.entries(i18n.languages).map(([ lang, langName ]) => (
            <React.Fragment key={lang}>
              <span
                className={classNames('footer_clickable', lang === i18n.getCurrentLanguage() && '-active' )}
                onClick={() => i18n.setCurrentLanguage(lang)}
                children={langName}
              />
              <span className="footer_separator">·</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
});
