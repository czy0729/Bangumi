/*
 * @Author: czy0729
 * @Date: 2026-09-20 04:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:08:01
 *
 * HTML 实体解码 (自研 cheerio 替换引擎的解析辅助, 仅解析层使用)
 * - 非法数字实体输出 U+FFFD; 业务文本解码见 ../../decode-loose
 * - 对齐 htmlparser2 v9 (entities 库 EntityDecoder) 语义:
 *   - 数字实体 (十进制/十六进制) 带/不带分号均解码; 前缀以 x/X 区分进制
 *   - 解不出合法码点 (0 / 越界 / 代理项区间) 输出 U+FFFD 替换符, 与 htmlparser2 一致
 *   - 命名实体带分号: 全表解码 (HTML5, 区分大小写)
 *   - 命名实体不带分号: 仅 legacy 集合; 属性值中若紧跟 "=" 或字母数字则不解码
 *     (防止 ?a=1&amp=2 被误解码)
 */
import { LEGACY_ENTITIES, NAMED_ENTITIES } from '../../entities'

const NUMERIC_RE = /^#([xX][0-9a-fA-F]+|[0-9]+);?/
const NAMED_RE = /^[a-zA-Z][a-zA-Z0-9]*;/

/** 解不出合法码点时输出替换符 (htmlparser2 对 0 / 越界 / 代理项的行为) */
const REPLACEMENT = '\uFFFD'

/** 解码数字实体; 0 / 越界 / 代理项区间均输出替换符 (htmlparser2 行为) */
function decodeNumeric(hex: string | undefined, dec: string | undefined): string {
  const codePoint = parseInt(hex ? hex.slice(1) : dec || '', hex ? 16 : 10)
  if (!Number.isFinite(codePoint) || codePoint > 0x10ffff || codePoint === 0) {
    return REPLACEMENT
  }
  // 未配对代理项: fromCodePoint 不抛错但产出孤立代理项, 统一输出替换符
  if (codePoint >= 0xd800 && codePoint <= 0xdfff) return REPLACEMENT
  try {
    return String.fromCodePoint(codePoint)
  } catch {
    return REPLACEMENT
  }
}

/** legacy 实体名最大长度, 限定无分号前缀扫描上限 (避免 O(n²) 切片) */
const MAX_LEGACY_NAME_LENGTH = Object.keys(LEGACY_ENTITIES).reduce(
  (max, name) => Math.max(max, name.length),
  0
)

/** 实体匹配窗口: & 之后需要查看的最大长度 (最长命名实体 / #x 十六进制数字) */
const MAX_ENTITY_LOOKAHEAD =
  Math.max(
    MAX_LEGACY_NAME_LENGTH,
    Object.keys(NAMED_ENTITIES).reduce((max, name) => Math.max(max, name.length), 0)
  ) + 2

/** 解码一段文本或属性值中的实体; attribute 模式用于属性值 */
export function decodeEntities(str: string, attribute: boolean): string {
  if (!str.includes('&')) return str

  let out = ''
  let i = 0
  while (i < str.length) {
    const amp = str.indexOf('&', i)
    if (amp === -1) {
      out += str.slice(i)
      break
    }
    out += str.slice(i, amp)
    // 只截取实体最长可能长度的窗口, 避免对余串整段切片造成 O(N×长度) 放大
    const rest = str.slice(amp + 1, amp + 1 + MAX_ENTITY_LOOKAHEAD)

    // 数字实体: #x... 为十六进制, #... 为十进制
    const numeric = rest.match(NUMERIC_RE)
    if (numeric) {
      const body = numeric[1]
      const isHex = body[0] === 'x' || body[0] === 'X'
      // 窗口边界守卫: 无分号数字被窗口截断 (下一个字符仍是数字) 时按原文保留
      const nextChar = str[amp + numeric[0].length]
      const continuation = isHex ? /[0-9a-fA-F]/ : /[0-9]/
      const truncated =
        numeric[0].length === rest.length && nextChar !== undefined && continuation.test(nextChar)
      if (truncated) {
        out += '&'
        i = amp + 1
        continue
      }
      out += isHex ? decodeNumeric(body, undefined) : decodeNumeric(undefined, body)
      i = amp + 1 + numeric[0].length
      continue
    }

    // 命名实体: 先试带分号 (全表), 再试不带分号 (legacy)
    const namedWithSemi = rest.match(NAMED_RE)
    const semiName = namedWithSemi ? namedWithSemi[0].slice(0, -1) : ''
    if (semiName && NAMED_ENTITIES[semiName] !== undefined) {
      out += NAMED_ENTITIES[semiName]
      i = amp + 1 + namedWithSemi![0].length
      continue
    }

    // 无分号 legacy: 候选名长度不超过表内最长实体名
    let matched: string | null = null
    const maxLen = Math.min(rest.length, MAX_LEGACY_NAME_LENGTH)
    for (let end = maxLen; end > 0; end--) {
      const name = rest.slice(0, end)
      if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) continue
      if (LEGACY_ENTITIES[name] !== undefined) {
        if (attribute) {
          // 边界字符查全串 (rest 可能被窗口截断)
          const next = str[amp + 1 + end]
          if (next === '=' || /[a-zA-Z0-9]/.test(next || '')) continue
        }
        matched = name
        break
      }
    }
    if (matched) {
      out += LEGACY_ENTITIES[matched]
      i = amp + 1 + matched.length
      continue
    }

    out += '&'
    i = amp + 1
  }

  return out
}
