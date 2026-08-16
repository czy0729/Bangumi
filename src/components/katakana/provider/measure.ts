/*
 * @Author: czy0729
 * @Date: 2026-08-16 09:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 09:00:00
 */
import { ROMAJI_WIDTH_RATIO } from '../ds'

/** 小假名 (半宽) */
const SMALL_KANA = new Set([
  'ぁ',
  'ぃ',
  'ぅ',
  'ぇ',
  'ぉ',
  'ゃ',
  'ゅ',
  'ょ',
  'っ',
  'ゎ',
  'ヵ',
  'ヶ',
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
  'ャ',
  'ュ',
  'ョ',
  'ッ',
  'ヮ'
])

/** 半角空格在 CJK 行内的视觉宽度占比 (实测明显窄于半角, 偏大会使空格后的罗马音整体偏左) */
const SPACE_WIDTH = 0.25

/**
 * 单字符视觉宽度
 *  - 全宽 (汉字/普通假名/全角符号/长音符) 计 1
 *  - 半宽 (ASCII/半角片假名/小假名/中点) 计 0.5
 *  - 半角空格/不换行空格 计 SPACE_WIDTH
 */
export function getCharWidth(ch: string): number {
  if (ch === ' ' || ch === '\u00A0') return SPACE_WIDTH
  const code = ch.charCodeAt(0)
  if (code < 0x80) return 0.5
  if (code >= 0xff61 && code <= 0xff9f) return 0.5
  if (ch === '・') return 0.5
  if (SMALL_KANA.has(ch)) return 0.5
  return 1
}

/** 文本区间 [from, to) 的视觉宽度之和 */
export function charWidthSum(text: string, from: number, to: number): number {
  let sum = 0
  for (let i = from; i < to; i += 1) sum += getCharWidth(text[i])
  return sum
}

/** 估算罗马音宽度 */
export function getRomajiWidth(en: string, size: number): number {
  return en.length * size * ROMAJI_WIDTH_RATIO
}