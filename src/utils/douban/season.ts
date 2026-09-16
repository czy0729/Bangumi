/*
 * @Author: czy0729
 * @Date: 2026-09-17 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 12:00:00
 *
 * 续作编号 (季数) 解析
 *
 * 同一部作品的续作在数据源里往往只差一个字符 (無職転生Ⅱ / 無職転生Ⅲ),
 * Levenshtein 相似度高达 0.95, 只靠相似度无法区分, 需要单独识别季数。
 *
 * 识别: 第三季 / 第3季 / Ⅲ / ⅲ / III / Season 3
 * 排除: 第Nクール / Part.N / 第N话 / 第N卷 (分部与集数不代表季)
 * 无法识别返回 0, 调用方据此退化为原有匹配逻辑
 */
import { ensureCacheLimit } from '../cache'

/** 中文数字 → 阿拉伯数字 */
const CN_NUMBER: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10
}

/** 罗马数字 → 阿拉伯数字 (Unicode 大写形态在解析前统一转小写) */
const ROMAN_NUMBER: Record<string, number> = {
  'ⅰ': 1,
  'ⅱ': 2,
  'ⅲ': 3,
  'ⅳ': 4,
  'ⅴ': 5,
  'ⅵ': 6,
  'ⅶ': 7,
  'ⅷ': 8,
  'ⅸ': 9,
  'ⅹ': 10,
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10
}

/** 分部与集数不是季, 解析前先摘除 */
const NON_SEASON = /第\d+クール|\d+\s*クール|part\s*\.?\s*\d+|第\d+[话話集卷]/g

/** Unicode 罗马数字 (Ⅰ~Ⅹ 的小写形态) */
const UNICODE_ROMAN = /[ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ]/

/** 拉丁罗马数字 (只取两个字符以上, 避免误伤英文单字母) */
const LATIN_ROMAN = /\b(i{2,3}|iv|vi{1,3}|ix)\b/

/** 中文数字转阿拉伯数字 (支持 一 ~ 九十九) */
function cnNumber(value: string): number {
  if (!value) return 0
  if (value === '十') return 10

  const [ten, unit] = value.split('十')
  if (unit === undefined) return CN_NUMBER[value] || 0

  return (ten ? CN_NUMBER[ten] || 0 : 1) * 10 + (unit ? CN_NUMBER[unit] || 0 : 0)
}

/** 季数解析缓存 */
const seasonCache = new Map<string, number>()
const SEASON_CACHE_MAX = 1000

/** 提取续作编号 (季数), 无法识别返回 0 */
export function getSeason(str?: string): number {
  if (!str) return 0

  const cached = seasonCache.get(str)
  if (cached !== undefined) return cached

  const value = parseSeason(str)
  seasonCache.set(str, value)
  ensureCacheLimit(seasonCache, SEASON_CACHE_MAX)

  return value
}

/** 两边的季数都存在且不同才算冲突 */
export function hasSeasonConflict(a: number, b: number): boolean {
  return a > 0 && b > 0 && a !== b
}

function parseSeason(str: string): number {
  // 罗马数字的大写形态 (Ⅰ Ⅱ Ⅲ) 会在小写化后变成 (ⅰ ⅱ ⅲ)
  const text = str.toLowerCase()

  // 摘掉分部与集数, 避免「第2クール」被当成第二季
  const clean = text.replace(NON_SEASON, ' ')

  // 第三季 / 第3季
  const cn = clean.match(/第([一二三四五六七八九十]+|\d+)季/)
  if (cn) return cnNumber(cn[1]) || Number(cn[1]) || 0

  // Season 3
  const season = clean.match(/season\s*(\d+)/)
  if (season) return Number(season[1])

  // Ⅲ / ⅲ / III
  const roman = clean.match(UNICODE_ROMAN) || clean.match(LATIN_ROMAN)
  if (roman) return ROMAN_NUMBER[roman[0]] || 0

  return 0
}
