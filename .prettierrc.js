/**
 * @See https://prettier.io/docs/en/options.html
 */
export default {
  /** 单行字符数，超出换行 */
  printWidth: 120,
  /** tab缩进空格 n */
  tabWidth: 2,
  /** true[使用tab缩进符缩进]; false[使用空格缩进] */
  useTabs: false,
  /** 行尾是否需要分号 */
  semi: false,
  /** 双引号 */
  quotes: false,
  /** 单引号 */
  singleQuote: true,
  /** jsx 单引号 */
  jsxSingleQuote: false,
  /** 行末尾逗号 [<es5|none|all>] */
  trailingComma: 'none',
  /** 大括号内的首尾空格 eg:{ 首尾空格 ExtendsClassWrap 首尾空格 } */
  bracketSpacing: true,
  /** jsx 标签的反尖括号放在最后一行的末尾，而不是单独放在下一行 */
  bracketSameLine: false,
  /** 箭头函数，只有一个参数的时候，是否需要括号 <always=true|avoid=false> */
  arrowParens: 'always',
  /**
   * 每个文件格式化的范围是文件的全部内容
   * 从 rangeStart int = 0 开始格式化
   * 到 rangeEnd   int = Infinity 结束格式化
   * 从0到无穷大，整个文件
   */
  rangeStart: 0,
  rangeEnd: Infinity,
  /** 换行符 <lf|crlf|cr|auto> */
  endOfLine: 'auto'
}
