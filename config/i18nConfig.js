const path = require('path')

// 当前项目根目录的路径
const curPath = __dirname

const supportLanguage = [
  'default',
  'en',
  'zh-cn',
  'zh-hk',
  'ja',
  'ko',
  'fi',
  'pl',
  'tr',
  'cs',
  'it',
  'de',
  'es',
  'fr',
  'ru',
  'pt',
  'nl',
  'uk',
  'hu',
  'sv',
  'kk',
  'el',
  'th',
  'bg',
  'sk',
  'lt',
  'ro',
  'no',
  'sq',
  'sl',
  'sr',
  'az',
  'da',
  'mk'
]

const langConfig = {
  supportLanguage, // 支持的语种
  i18nDirPath: path.resolve(__dirname, '../locales'),
  filename: 'global',
}

module.exports = langConfig
