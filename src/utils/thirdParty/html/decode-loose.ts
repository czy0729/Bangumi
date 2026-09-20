/*
 * @Author: czy0729
 * @Date: 2026-09-20 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:50
 *
 * 业务文本的宽松实体解码 (匹配粒度沿用 html-entities-decoder, 实体表取 HTML5 标准表)
 * - 与旧 html-entities-decoder 的表差异: 旧表多出 exists (HTML5 无此实体),
 *   lambda / nu / lang / rang 旧值有误, 本表取标准值
 * - 数字实体边界是修正后的口径: 超 BMP 码点按码点解码, 0 / 越界 / 代理项 / 负数保留原文
 * - 与解析层 engines/self/decode.ts 的 decodeEntities 策略相反: 非法数字实体保留原文, 不输出 U+FFFD
 */
import { NAMED_ENTITIES } from './entities'

/** 匹配粒度: `&` 后至少 2 个非 `;` 字符 + 可选 `;` */
const LOOSE_RE = /&([^;]{2,});?/g

/** 数字实体: 0 / 越界 / 代理项 / 负数一律保留原文 */
function decodeLooseNumeric(match: string, codePoint: number): string {
  if (!Number.isFinite(codePoint)) return match
  if (codePoint <= 0 || codePoint > 0x10ffff) return match
  if (codePoint >= 0xd800 && codePoint <= 0xdfff) return match

  try {
    return String.fromCodePoint(codePoint)
  } catch {
    return match
  }
}

/**
 * 宽松实体解码
 * - 命名实体取 HTML5 全表; 数字实体十进制/十六进制均可, 分号可选
 * - 超出 BMP 的码点按码点解码 (如 `&#x1F600;`)
 * - 非法数字实体保留原文 (解析层 decodeEntities 输出 U+FFFD)
 * - 匹配粒度按 `&[^;]{2,};?`: `&amp x` 这类不带分号的残串保持原文
 */
export function decodeEntitiesLoose(str: string): string {
  if (!str.includes('&')) return str

  return str.replace(LOOSE_RE, (match, entity: string) => {
    if (Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity)) {
      return NAMED_ENTITIES[entity]
    }

    if (entity.charCodeAt(0) === 35) {
      const isHex = entity[1] === 'x' || entity[1] === 'X'
      return decodeLooseNumeric(match, parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10))
    }

    return match
  })
}
