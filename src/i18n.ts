import { createSignal } from 'solid-js';
import { createEffectGlobal } from './utils';

export const languages = {
  en: 'English',
  de: 'Deutsch',
  fr: 'français',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};

export const [ getCurrentLanguage, setCurrentLanguage ] = createSignal(
  localStorage.getItem('ffxiv-weather.language') ??
  navigator.languages.find(lang => lang.slice(0, 2) in languages)?.slice(0, 2) ??
  'zh');
createEffectGlobal(() => localStorage.setItem('ffxiv-weather.language', getCurrentLanguage()));

export function t(s: TemplateStringsArray | string, ...args: any[]): string {
  const lang = getCurrentLanguage();
  if (typeof s === 'string') {
    return texts[s]?.[lang] || s;
  } else if (s.length === 1) {
    return texts[s[0]]?.[lang] || s[0];
  } else {
    const parts = [];
    for (let i = 0; i < s.length - 1; i++) {
      parts.push(s[i]);
      parts.push('{', i, '}');
    }
    parts.push(s[s.length - 1]);
    let template = parts.join('');
    template = texts[template]?.[lang] || template;
    return template.replace(/{(\d+)}/g, (_, $1) => args[$1]);
  }
}

const texts = {
  'FFXIV Weather Lookup': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '最终幻想14天气查询',
    ko: '',
  },
  'en': {
    en: 'en',
    de: 'de',
    fr: 'fr',
    ja: 'ja',
    zh: 'zh-CN',
    ko: 'ko',
  },

  'Zone': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '地区',
    ko: '지역',
  },
  'Select Zone': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '请选择一个地区',
    ko: '지역을 선택하세요',
  },
  'Weather': {
    en: '',
    de: '',
    fr: '',
    ja: '天気',
    zh: '天气',
    ko: '날씨',
  },
  'Previous Weather': {
    en: '',
    de: '',
    fr: '',
    ja: '前の天気',
    zh: '前置天气',
    ko: '이전 날씨',
  },
  'Right click to multiple select': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '右击多选',
    ko: '우클릭으로 여러 개 선택',
  },
  'Time': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '时间',
    ko: '',
  },
  'Click start time then select a range': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '点击开始时间然后选择一个时间段',
    ko: '',
  },
  'Any': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '任意',
    ko: '아무거나',
  },
  'Found {0} matches in next {1} earth days': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '未来 {1} 地球天内共有 {0} 个时段符合条件',
    ko: '',
  },
  'Showing future weather list, select some conditions to query matched periods': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '正在展示未来的天气序列，选择一些条件可以查询符合的时段',
    ko: '',
  },
  'Local Time': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '本地时间',
    ko: '현실 시간',
  },
  'Eorzea Time': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '艾欧泽亚时间',
    ko: '에오르제아 시간',
  },
  'Start Time': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '开始时间',
    ko: '',
  },
  'End Time': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '结束时间',
    ko: '',
  },
  'Weathers': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '天气',
    ko: '날씨',
  },
  'Show more': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '显示更多',
    ko: '더 보기',
  },
  'License': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '许可协议',
    ko: '',
  },
  'Code': {
    en: '',
    de: '',
    fr: '',
    ja: '',
    zh: '源代码',
    ko: '',
  },

  'Limsa Lominsa': {
    en: 'Limsa',
    de: 'Limsa',
    fr: 'Limsa',
    ja: 'リムサ',
    zh: '海都',
    ko: '림사',
  },
  'Middle La Noscea': {
    en: 'Middle',
    de: 'Zentrales',
    fr: 'Centrale',
    ja: '中ラ',
    zh: '中拉',
    ko: '중부',
  },
  'Lower La Noscea': {
    en: 'Lower',
    de: 'Unteres',
    fr: 'Basse',
    ja: '低ラ',
    zh: '拉低',
    ko: '저지',
  },
  'Eastern La Noscea': {
    en: 'Eastern',
    de: 'Östliches',
    fr: 'Orientale',
    ja: '東ラ',
    zh: '东拉',
    ko: '동부',
  },
  'Western La Noscea': {
    en: 'Western',
    de: 'Westliches',
    fr: 'Noscea',
    ja: '西ラ',
    zh: '西拉',
    ko: '서부',
  },
  'Upper La Noscea': {
    en: 'Upper',
    de: 'Oberes',
    fr: 'Haute',
    ja: '高ラ',
    zh: '拉高',
    ko: '고지',
  },
  'Outer La Noscea': {
    en: 'Outer',
    de: 'Äußeres',
    fr: 'Noscea',
    ja: '外ラ',
    zh: '拉外',
    ko: '외지',
  },
  'Mist': {
    en: 'Mist',
    de: 'Nebels',
    fr: 'Brumée',
    ja: 'ミスト',
    zh: '海雾村',
    ko: '안갯빛',
  },
  'Gridania': {
    en: 'Gridania',
    de: 'Gridania',
    fr: 'Gridania',
    ja: 'グリダニア',
    zh: '森都',
    ko: '그리다니아',
  },
  'Central Shroud': {
    en: 'Central',
    de: 'Tiefer',
    fr: 'Centrale',
    ja: '中森',
    zh: '中森',
    ko: '중부',
  },
  'East Shroud': {
    en: 'East',
    de: 'Ost',
    fr: 'L\'est',
    ja: '東森',
    zh: '东森',
    ko: '동부',
  },
  'South Shroud': {
    en: 'South',
    de: 'Süd',
    fr: 'Sud',
    ja: '南森',
    zh: '南森',
    ko: '남부',
  },
  'North Shroud': {
    en: 'North',
    de: 'Nord',
    fr: 'Nord',
    ja: '北森',
    zh: '北森',
    ko: '북부',
  },
  'The Lavender Beds': {
    en: 'Lavender',
    de: 'Lavendelbeete',
    fr: 'Lavandière',
    ja: 'ラベンダー',
    zh: '薰衣草苗圃',
    ko: '라벤더',
  },
  'Ul\'dah': {
    en: 'Ul\'dah',
    de: 'Kreuzgang',
    fr: 'Ul\'dah',
    ja: 'ウルダハ',
    zh: '沙都',
    ko: '울다하',
  },
  'Western Thanalan': {
    en: 'Western',
    de: 'Westliches',
    fr: 'Occidental',
    ja: '西ザ',
    zh: '西萨',
    ko: '서부',
  },
  'Central Thanalan': {
    en: 'Central',
    de: 'Zentrales',
    fr: 'Central',
    ja: '中ザ',
    zh: '中萨',
    ko: '중부',
  },
  'Eastern Thanalan': {
    en: 'Eastern',
    de: 'Östliches',
    fr: 'Oriental',
    ja: '東ザ',
    zh: '东萨',
    ko: '동부',
  },
  'Southern Thanalan': {
    en: 'Southern',
    de: 'Südliches',
    fr: 'Méridional',
    ja: '南ザ',
    zh: '南萨',
    ko: '남부',
  },
  'Northern Thanalan': {
    en: 'Northern',
    de: 'Nördliches',
    fr: 'Septentrional',
    ja: '北ザ',
    zh: '北萨',
    ko: '북부',
  },
  'The Goblet': {
    en: 'Goblet',
    de: 'Kelchkuppe',
    fr: 'La Coup',
    ja: 'ゴブレット',
    zh: '高脚孤丘',
    ko: '하늘잔',
  },
  'Ishgard': {
    en: 'Ishgard',
    de: 'Ishgard',
    fr: 'Ishgard',
    ja: 'イシュガルド',
    zh: '伊修加德',
    ko: '이슈가르드',
  },
  'Coerthas Central Highlands': {
    en: 'Central',
    de: 'Zentrales',
    fr: 'Central',
    ja: 'ク中',
    zh: '中高',
    ko: '중앙고지',
  },
  'Coerthas Western Highlands': {
    en: 'Western',
    de: 'Westliches',
    fr: 'Occidental',
    ja: 'ク西',
    zh: '西高',
    ko: '서부고지',
  },
  'Empyreum': {
    en: 'Empyreum',
    de: 'Empyreum',
    fr: 'Empyrée',
    ja: 'エンピレアム',
    zh: '穹顶皓天',
    ko: '지고천 거리',
  },
  'The Sea of Clouds': {
    en: 'Sea of Clouds',
    de: 'Wolkenmeer',
    fr: 'L\'Écume des cieux',
    ja: 'ア雲',
    zh: '云海',
    ko: '구름바다',
  },
  'Azys Lla': {
    en: 'Azys Lla',
    de: 'Azys Lla',
    fr: 'Azys Lla',
    ja: '魔大陸',
    zh: '魔大陆',
    ko: '아지스 라',
  },
  'The Diadem': {
    en: 'Diadem',
    de: 'Diadem',
    fr: 'Diadème',
    ja: 'ディアデム',
    zh: '空岛',
    ko: '디아뎀',
  },
  'Idyllshire': {
    en: 'Idyllshire',
    de: 'Frohehalde',
    fr: 'Idyllée',
    ja: 'イディルシャイア',
    zh: '田园郡',
    ko: '이딜샤이어',
  },
  'The Dravanian Forelands': {
    en: 'Forelands',
    de: 'Vorland',
    fr: 'Avant-pays',
    ja: '高ド',
    zh: '龙高',
    ko: '고지',
  },
  'The Dravanian Hinterlands': {
    en: 'Hinterlands',
    de: 'Hinterland',
    fr: 'Arrière-pays',
    ja: '低ド',
    zh: '龙低',
    ko: '저지',
  },
  'The Churning Mists': {
    en: 'Churning Mists',
    de: 'Wallende Nebel',
    fr: 'L\'Écume des cieux',
    ja: 'ド雲',
    zh: '雾海',
    ko: '구름바다',
  },
  'Mor Dhona': {
    en: 'Mor Dhona',
    de: 'Mor Dhona',
    fr: 'Mor Dhona',
    ja: 'モードゥナ',
    zh: '摩杜纳',
    ko: '모르도나',
  },
  'Rhalgr\'s Reach': {
    en: 'Rhalgr',
    de: 'Rhalgr',
    fr: 'Rhalgr',
    ja: 'ラールガー',
    zh: '神拳痕',
    ko: '랄거',
  },
  'The Fringes': {
    en: 'Fringes',
    de: 'Grenzland',
    fr: 'Marges',
    ja: 'ギ辺',
    zh: '边区',
    ko: '기라변방',
  },
  'The Peaks': {
    en: 'Peaks',
    de: 'Zinnen',
    fr: 'Pics',
    ja: 'ギ山',
    zh: '山区',
    ko: '기라산악',
  },
  'The Lochs': {
    en: 'Lochs',
    de: 'Fenn',
    fr: 'Lacs',
    ja: 'ギ湖',
    zh: '湖区',
    ko: '기라호반',
  },
  'Kugane': {
    en: 'Kugane',
    de: 'Kugane',
    fr: 'Kugane',
    ja: 'クガネ',
    zh: '黄金港',
    ko: '쿠가네',
  },
  'Shirogane': {
    en: 'Shirogane',
    de: 'Shirogane',
    fr: 'Shirogane',
    ja: 'シロガネ',
    zh: '白银乡',
    ko: '시로가네',
  },
  'The Ruby Sea': {
    en: 'Ruby Sea',
    de: 'Rubinsee',
    fr: 'Mer de Rubis',
    ja: '紅玉海',
    zh: '红玉海',
    ko: '홍옥해',
  },
  'Yanxia': {
    en: 'Yanxia',
    de: 'Yanxia',
    fr: 'Yanxia',
    ja: 'ヤンサ',
    zh: '延夏',
    ko: '얀샤',
  },
  'The Azim Steppe': {
    en: 'Azim Steppe',
    de: 'Azim-Steppe',
    fr: 'Steppe d\'Azim',
    ja: 'アジムステップ',
    zh: '草原',
    ko: '아짐 대초원',
  },
  'Eureka Anemos': {
    en: 'Anemos',
    de: 'Anemos',
    fr: 'Anemos',
    ja: 'アネモス',
    zh: '常风',
    ko: '아네모스',
  },
  'Eureka Pagos': {
    en: 'Pagos',
    de: 'Pagos',
    fr: 'Pagos',
    ja: 'パゴス',
    zh: '恒冰',
    ko: '파고스',
  },
  'Eureka Pyros': {
    en: 'Pyros',
    de: 'Pyros',
    fr: 'Pyros',
    ja: 'ピューロス',
    zh: '涌火',
    ko: '피로스',
  },
  'Eureka Hydatos': {
    en: 'Hydatos',
    de: 'Hydatos',
    fr: 'Hydatos',
    ja: 'ヒュダトス',
    zh: '丰水',
    ko: '히다토스',
  },
  'Bozjan Southern Front': {
    en: 'Bozjan Front',
    de: 'Bozja-Front',
    fr: 'Front de Bozja',
    ja: 'ボズヤ戦線',
    zh: '博兹雅战线',
    ko: '보즈야 전선',
  },
  'Zadnor': {
    en: 'Zadnor',
    de: 'Zadnor',
    fr: 'Zadnor',
    ja: 'ザトゥノル',
    zh: '高原',
    ko: '자트노르',
  },
  'The Crystarium': {
    en: 'Crystarium',
    de: 'Crystarium',
    fr: 'Cristarium',
    ja: 'クリスタリウム',
    zh: '水晶都',
    ko: '크리스타리움',
  },
  'Eulmore': {
    en: 'Eulmore',
    de: 'Eulmore',
    fr: 'Eulmore',
    ja: 'ユールモア',
    zh: '游末邦',
    ko: '율모어',
  },
  'Lakeland': {
    en: 'Lakeland',
    de: 'Seenland',
    fr: 'Grand-Lac',
    ja: 'レイクランド',
    zh: '雷克兰德',
    ko: '레이크랜드',
  },
  'Kholusia': {
    en: 'Kholusia',
    de: 'Kholusia',
    fr: 'Kholusia',
    ja: 'コルシア',
    zh: '珂露西亚',
    ko: '콜루시아',
  },
  'Amh Araeng': {
    en: 'Amh Araeng',
    de: 'Amh Araeng',
    fr: 'Amh Araeng',
    ja: 'アム・アレーン',
    zh: '安穆艾兰',
    ko: '아므 아랭',
  },
  'Il Mheg': {
    en: 'Il Mheg',
    de: 'Il Mheg',
    fr: 'Il Mheg',
    ja: 'イル・メグ',
    zh: '伊尔美格',
    ko: '일 메그',
  },
  'The Rak\'tika Greatwood': {
    en: 'LaHee',
    de: 'LaHee',
    fr: 'LaHee',
    ja: 'LaHee',
    zh: 'LaHee',
    ko: 'LaHee',
  },
  'The Tempest': {
    en: 'Tempest',
    de: 'Tempest',
    fr: 'Tempête',
    ja: 'テンペスト',
    zh: '黑风海',
    ko: '템페스트',
  },
  'Old Sharlayan': {
    en: 'Sharlayan',
    de: 'Sharlayan',
    fr: 'Sharlayan',
    ja: 'シャーレアン',
    zh: '萨雷安',
    ko: '샬레이안',
  },
  'Radz-at-Han': {
    en: 'Radz-at-Han',
    de: 'Radz-at-Han',
    fr: 'Radz-at-Han',
    ja: 'ラザハン',
    zh: '拉札罕',
    ko: '라자한',
  },
  'Labyrinthos': {
    en: 'Labyrinthos',
    de: 'Labyrinthos',
    fr: 'Labyrinthos',
    ja: 'ラヴィリンソス',
    zh: '迷津',
    ko: '라비린토스',
  },
  'Thavnair': {
    en: 'Thavnair',
    de: 'Thavnair',
    fr: 'Thavnair',
    ja: 'サベネア',
    zh: '萨维奈',
    ko: '사베네어',
  },
  'Garlemald': {
    en: 'Garlemald',
    de: 'Garlemald',
    fr: 'Garlemald',
    ja: 'ガレマルド',
    zh: '加雷马',
    ko: '갈레말드',
  },
  'Mare Lamentorum': {
    en: 'Mare Lamentorum',
    de: 'Mare Lamentorum',
    fr: 'Mare Lamentorum',
    ja: '嘆きの海',
    zh: '叹息海',
    ko: '비탄의 바다',
  },
  'Elpis': {
    en: 'Elpis',
    de: 'Elpis',
    fr: 'Elpis',
    ja: 'エルピス',
    zh: '厄尔庇斯',
    ko: '엘피스',
  },
  'Ultima Thule': {
    en: 'Thule',
    de: 'Thule',
    fr: 'Thulé',
    ja: 'トゥーレ',
    zh: '天垓',
    ko: '울툴레',
  },
  'Unnamed Island': {
    en: 'Unnamed Island',
    de: 'Einsame Insel',
    fr: 'Île sans nom',
    ja: '名もなき島',
    zh: '无名岛',
    ko: '이름 없는 섬',
  },

  'Clear Skies': {
    en: 'Clear',
    de: 'Klar',
    fr: 'Dégagé',
    ja: '快晴',
    zh: '碧空',
    ko: '쾌청',
  },
  'Fair Skies': {
    en: 'Fair',
    de: 'Heiter',
    fr: 'Clair',
    ja: '晴れ',
    zh: '晴朗',
    ko: '맑음',
  },
  'Clouds': {
    en: 'Clouds',
    de: 'Wolkig',
    fr: 'Couvert',
    ja: '曇り',
    zh: '阴云',
    ko: '흐림',
  },
  'Fog': {
    en: 'Fog',
    de: 'Neblig',
    fr: 'Brouillard',
    ja: '霧',
    zh: '薄雾',
    ko: '안개',
  },
  'Wind': {
    en: 'Wind',
    de: 'Windig',
    fr: 'Vent',
    ja: '風',
    zh: '微风',
    ko: '바람',
  },
  'Gales': {
    en: 'Gales',
    de: 'Stürmisch',
    fr: 'Vents Violents',
    ja: '暴風',
    zh: '强风',
    ko: '폭풍',
  },
  'Rain': {
    en: 'Rain',
    de: 'Regnerisch',
    fr: 'Pluie',
    ja: '雨',
    zh: '小雨',
    ko: '비',
  },
  'Showers': {
    en: 'Showers',
    de: 'Wolkenbruch',
    fr: 'Torrentielle',
    ja: '暴雨',
    zh: '暴雨',
    ko: '폭우',
  },
  'Thunder': {
    en: 'Thunder',
    de: 'Gewittrig',
    fr: 'Orages',
    ja: '雷',
    zh: '打雷',
    ko: '번개',
  },
  'Thunderstorms': {
    en: 'Thunderstorms',
    de: 'Gewitter',
    fr: 'Orages violents',
    ja: '雷雨',
    zh: '雷雨',
    ko: '뇌우',
  },
  'Dust Storms': {
    en: 'Dust',
    de: 'Staubig',
    fr: 'Poussière',
    ja: '砂塵',
    zh: '扬沙',
    ko: '모래먼지',
  },
  'Heat Waves': {
    en: 'Heat Waves',
    de: 'Gluthitze',
    fr: 'Torride',
    ja: '灼熱波',
    zh: '热浪',
    ko: '작열파',
  },
  'Snow': {
    en: 'Snow',
    de: 'Schnee',
    fr: 'Neige',
    ja: '雪',
    zh: '小雪',
    ko: '눈',
  },
  'Blizzards': {
    en: 'Blizzards',
    de: 'Schneesturm',
    fr: 'Blizzard',
    ja: '吹雪',
    zh: '暴雪',
    ko: '눈보라',
  },
  'Gloom': {
    en: 'Gloom',
    de: 'Unheimlich',
    fr: 'Nébuleux',
    ja: '妖霧',
    zh: '妖雾',
    ko: '요마의 안개',
  },
  'Umbral Wind': {
    en: 'Umbral Wind',
    de: 'Schattenwind',
    fr: 'Vent ombral',
    ja: '霊風',
    zh: '灵风',
    ko: '그림자 바람',
  },
  'Umbral Static': {
    en: 'Umbral Static',
    de: 'Schattengewitter',
    fr: 'Charges ombrales',
    ja: '放電',
    zh: '灵电',
    ko: '방전',
  },
  'Moon Dust': {
    en: 'Moon Dust',
    de: 'Mondstaubig',
    fr: 'Tempêtes de régolithe',
    ja: '月砂塵',
    zh: '月尘',
    ko: '달모래먼지',
  },
  'Astromagnetic Storm': {
    en: 'Astromagnetic Storm',
    de: 'Magnetsturm',
    fr: 'Astromagnétique',
    ja: '磁気嵐',
    zh: '磁暴',
    ko: '자기장 폭풍',
  },

  'Garlok': {
    en: 'the Garlok',
    de: 'Garlok',
    fr: 'Garlok',
    ja: 'ガーロック',
    zh: '伽洛克 - 天气保持薄雾、碧空、晴朗、阴云200分钟时开始，不再是这些天气时结束。',
    ko: '갈록',
  },
  'Laideronnette': {
    en: 'Laideronnette',
    de: 'Laideronette',
    fr: 'Laideronnette',
    ja: 'レドロネット',
    zh: '雷德罗巨蛇 - 天气保持小雨30分钟时开始，天气不再是小雨时结束。',
    ko: '레드로네트',
  },
} as { [index: string]: { [index: string]: string } };
