/*
 * @Author: czy0729
 * @Date: 2025-08-19 05:56:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 20:47:16
 */

// ------------------- 配置 -------------------
/** 最大缓存数 */
const LRU_CACHE_LIMIT = 500

/** 字符串小于多少长度才允许缓存 */
const LRU_CACHE_LENGTH = 50

// ------------------- 正则定义 -------------------
const CJK =
  '\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FA\u30FC-\u30FF\u3100-\u312F\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF'
const ANY_CJK = new RegExp('[' + CJK + ']')

const M_ADD_SPACE = new RegExp(
  `([${CJK}])([a-zA-Z0-9]+|[a-zA-Z0-9]+[\\x20-\\xFF]+[a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9.,]*[a-zA-Z0-9][%°]|[a-zA-Z0-9][%°]|[a-zA-Z0-9][a-zA-Z0-9/,.]+[a-zA-Z0-9])([${CJK}])`,
  'g'
)
const P_ADD_SPACE = new RegExp(
  `(^|[\\r\\n])([a-zA-Z0-9]+|[a-zA-Z0-9]+[\\x20-\\xFF]+[a-zA-Z0-9]+)([${CJK}])`,
  'g'
)
const S_ADD_SPACE = new RegExp(
  `([${CJK}])([a-zA-Z0-9]+|[a-zA-Z0-9]+[\\x20-\\xFF]+[a-zA-Z0-9]+)([\\r\\n]|$)`,
  'g'
)

const CMB = '\uff01-\uff64\u3001\u3002'
const CMB2 = `${CMB}」》】〉｝］）〗〕』`

const M_ADD_SPACE_2 = new RegExp(
  `([${CMB}])([a-zA-Z0-9]+|[a-zA-Z0-9]+[\\x20-\\xFF]+[a-zA-Z0-9]+)([${CJK}])`,
  'g'
)
const M_ADD_SPACE_3 = new RegExp(
  `([${CJK}])([a-zA-Z0-9]+|[a-zA-Z0-9]+[\\x20-\\xFF]+[a-zA-Z0-9]+|[a-zA-Z0-9][a-zA-Z0-9.,]*[a-zA-Z0-9][%°]|[a-zA-Z0-9][%°])([${CMB}])`,
  'g'
)

const M_COV_SYMBOL = new RegExp(`([${CJK}])([~!;:,?])([${CJK}])`, 'g')
const S_ADD_SPACE_2 = new RegExp(`([a-zA-Z0-9]+)([~!;:,?])([${CJK}])`, 'g')

const CJK2 = `${CJK}\\d,.\\/\\\\`
const A_ADD_SPACE = new RegExp(
  `([${CJK}])([!#$%&\\x2A-\\x5A\\x5E\\x5F\\x61-\\x7A~\\x80-\\xFF]+)\\x20([${CJK}])`,
  'g'
)

const Q_ADD_SPACE = new RegExp(`([${CJK}])(['"])([${CJK2}]+)\\2([${CJK}])`, 'g')
const Q_ADD_SPACE_2 = new RegExp(`([${CJK}])([“])([${CJK2}]+)([”])([${CJK}])`, 'g')
const Q_ADD_SPACE_3 = new RegExp(`([${CJK}])([‘])([${CJK2}]+)([’])([${CJK}])`, 'g')
const Q_ADD_SPACE_4 = new RegExp(`([${CJK}])([(])([${CJK2}]+)([)])([${CJK}])`, 'g')
const Q_ADD_SPACE_5 = new RegExp(`([${CJK}])([\\[])([${CJK2}]+)([\\]])([${CJK}])`, 'g')
const Q_ADD_SPACE_6 = new RegExp(`([${CJK}])([\\{])([${CJK2}]+)([\\}])([${CJK}])`, 'g')

const Q_ADD_SPACE_1b = new RegExp(`([${CMB}])(['"])([${CJK2}]+)\\2([${CJK}])`, 'g')
const Q_ADD_SPACE_2b = new RegExp(`([${CMB}])([“])([${CJK2}]+)([”])([${CJK}])`, 'g')
const Q_ADD_SPACE_3b = new RegExp(`([${CMB}])([‘])([${CJK2}]+)([’])([${CJK}])`, 'g')
const Q_ADD_SPACE_4b = new RegExp(`([${CMB}])([(])([${CJK2}]+)([)])([${CJK}])`, 'g')
const Q_ADD_SPACE_5b = new RegExp(`([${CMB}])([\\[])([${CJK2}]+)([\\]])([${CJK}])`, 'g')
const Q_ADD_SPACE_6b = new RegExp(`([${CMB}])([\\{])([${CJK2}]+)([\\}])([${CJK}])`, 'g')

const QA_ADD_SPACE = new RegExp(
  `([${CJK}])(['"“”‘’(){}\\[\\]])([^'"“”‘’(){}\\[\\]]+)(['"“”‘’(){}\\[\\]])([${CMB2}])`
)
const QA_ADD_SPACE_2 = new RegExp(
  `([${CJK}])(['"“”‘’(){}\\[\\]])([a-zA-Z0-9.,]+)(['"“”‘’(){}\\[\\]])([${CJK}])`
)

// ------------------- 工具函数 -------------------
function loopReplace(
  text: string,
  search: RegExp,
  replacement: string | ((...args: any[]) => string)
) {
  let maxN = Math.round(text.length / 2) + 4
  while (maxN-- > 0) {
    const t = text.replace(search, replacement as any)
    if (t === text) return t
    text = t
  }
  return text
}

function convertToFullwidth(symbols: string) {
  return symbols.replace(/[~!;:,?]/g, x => String.fromCharCode(x.charCodeAt(0) + 65248))
}

function bracket(b: string, d: string) {
  return (
    (b === "'" && d === "'") ||
    (b === '"' && d === '"') ||
    (b === '“' && d === '”') ||
    (b === '‘' && d === '’') ||
    (b === '(' && d === ')') ||
    (b === '[' && d === ']') ||
    (b === '{' && d === '}')
  )
}

// ------------------- 主 replacer -------------------
function replacer(text: string) {
  let newText = text
  const nLen = text.length
  if (nLen <= 1) return text

  if (nLen >= 3) newText = loopReplace(newText, M_ADD_SPACE, '$1 $2 $3')
  newText = loopReplace(newText, P_ADD_SPACE, '$1$2 $3')
  newText = loopReplace(newText, S_ADD_SPACE, '$1 $2$3')
  if (nLen >= 3) newText = loopReplace(newText, M_ADD_SPACE_2, '$1$2 $3')
  if (nLen >= 3) newText = loopReplace(newText, M_ADD_SPACE_3, '$1 $2$3')
  if (nLen >= 3)
    newText = loopReplace(newText, M_COV_SYMBOL, (_, a, b, c) => {
      const d = convertToFullwidth(b)
      return d !== b ? a + d + c : _
    })
  if (nLen >= 3) newText = loopReplace(newText, S_ADD_SPACE_2, '$1$2 $3')
  if (nLen >= 3) newText = loopReplace(newText, A_ADD_SPACE, '$1 $2 $3')

  if (nLen >= 5 && /['"“”‘’(){}\[\]]/.test(newText)) {
    newText = loopReplace(newText, Q_ADD_SPACE, '$1 $2$3$2 $4')
    newText = loopReplace(newText, Q_ADD_SPACE_2, '$1 $2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_3, '$1 $2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_4, '$1 $2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_5, '$1 $2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_6, '$1 $2$3$4 $5')
    newText = loopReplace(newText, QA_ADD_SPACE, (_, a, b, c, d, e) => {
      return bracket(b, d) ? `${a} ${b}${c}${d}${e}` : _
    })
    newText = loopReplace(newText, QA_ADD_SPACE_2, (_, a, b, c, d, e) => {
      return bracket(b, d) ? `${a} ${b}${c}${d} ${e}` : _
    })
    newText = loopReplace(newText, Q_ADD_SPACE_1b, '$1$2$3$2 $4')
    newText = loopReplace(newText, Q_ADD_SPACE_2b, '$1$2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_3b, '$1$2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_4b, '$1$2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_5b, '$1$2$3$4 $5')
    newText = loopReplace(newText, Q_ADD_SPACE_6b, '$1$2$3$4 $5')
  }

  return newText
}

function replacerM(text: string) {
  const s = text.split(/([a-z0-9]+:\/\/[^\s]+)/)
  if (s.length >= 3) {
    for (let i = 0; i < s.length; i++) {
      if (i % 2 === 0) {
        const t = s[i]
        if (t.length >= 2) s[i] = replacer(t)
      }
    }
    return s.join('')
  } else {
    return replacer(text)
  }
}

function customReplacer(text: string): string {
  // 先保护所有双斜杠，避免被拆开为空格
  const PLACEHOLDER = '__DOUBLE_SLASH__'
  const protectedText = text.replace(/\/\//g, PLACEHOLDER)

  let newText = protectedText

  // 1. 只在左右不对称时补空格，且 / 不能在开头或结尾
  newText = newText
    // 左边有空格，右边没空格 → 补右边空格
    .replace(/(\s)\/(\S)(?=\S)/g, '$1/ $2')
    // 左边没空格，右边有空格 → 补左边空格
    .replace(/(\S)(?=\S)\/(\s)/g, '$1 /$2')

  // 2. 这里可以继续放其它你的替换规则，比如标点、空格、全角半角等
  //    newText = newText.replace(...)

  // 还原 //，保持原样
  return newText.replace(new RegExp(PLACEHOLDER, 'g'), '//')
}

// ------------------- 缓存 LRU -------------------
class LRUCache<K, V> {
  private limit: number
  private map: Map<K, V>
  constructor(limit = 200) {
    this.limit = limit
    this.map = new Map()
  }
  get(key: K): V | undefined {
    if (!this.map.has(key)) return undefined
    const val = this.map.get(key)!
    this.map.delete(key)
    this.map.set(key, val)
    return val
  }
  set(key: K, val: V) {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, val)
    if (this.map.size > this.limit) {
      const oldest = this.map.keys().next().value
      this.map.delete(oldest)
    }
  }
}

const cache = new LRUCache<string, string>(LRU_CACHE_LIMIT)

// ------------------- 导出 API -------------------
/** 文案排版转换 */
export function spacing(text: string): string {
  if (typeof text !== 'string' || text.length <= 1 || !ANY_CJK.test(text)) {
    return text
  }

  const shouldCache = text.length <= LRU_CACHE_LENGTH
  if (shouldCache) {
    const cached = cache.get(text)
    if (cached) return cached
  }

  const newText = customReplacer(replacerM(text))
  if (shouldCache) {
    cache.set(text, newText)
  }

  return newText
}
