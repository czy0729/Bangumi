/*
 * @Author: czy0729
 * @Date: 2026-08-15 07:37:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-15 07:37:38
 */
import { getKatakanaAlign, getMeasuredMatches, shouldRenderKatakana } from '../utils'

import type { TextLayoutLine } from 'react-native'

jest.mock('@utils/dev', () => ({ rc: (_parent, name) => String(name) }))

/** 生成 TextLayoutLine 测试数据 */
const makeLine = (over: Partial<TextLayoutLine>): TextLayoutLine => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  text: '',
  ascender: 0,
  capHeight: 0,
  descender: 0,
  xHeight: 0,
  ...over
})

const line = makeLine({ x: 10, y: 20, width: 100, height: 14, text: 'アニメとゲーム' })

describe('getKatakanaAlign', () => {
  const base = { jp: 'アニメ', en: 'Anime', left: 10, width: 50, lineWidth: 100 }

  it('有显式 align 时优先返回 align', () => {
    expect(getKatakanaAlign({ ...base, align: 'left' })).toBe('left')
    expect(getKatakanaAlign({ ...base, align: 'center' })).toBe('center')
  })

  it('无 align 且右边缘贴近行尾时返回 left', () => {
    expect(getKatakanaAlign({ ...base, left: 60, width: 50 })).toBe('left')
  })

  it('无 align 且未贴近行尾时返回 center', () => {
    expect(getKatakanaAlign({ ...base, left: 10, width: 50 })).toBe('center')
  })

  it('无 align 且行宽为 0 时返回 center', () => {
    expect(getKatakanaAlign({ ...base, lineWidth: 0 })).toBe('center')
  })
})

describe('getMeasuredMatches', () => {
  it('matches 为空返回空数组', () => {
    expect(getMeasuredMatches([], [line])).toEqual([])
  })

  it('lines 为空返回空数组', () => {
    expect(getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [])).toEqual([])
  })

  it('匹配不存在的行被过滤', () => {
    expect(getMeasuredMatches([{ jp: 'サッカー', en: 'Soccer' }], [line])).toEqual([])
  })

  it('行首片段: 位置按行内比例计算', () => {
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [line])[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBe(20)
    expect(result.left).toBe(10)
    expect(result.width).toBeCloseTo((3 / 7) * 100, 5)
    expect(result.lineWidth).toBe(100)
  })

  it('行中片段: 水平位置包含偏移量', () => {
    // 'アニメ' 3 字 + 'と' 1 字, 故 'ゲーム' 偏移量为 4
    const result = getMeasuredMatches([{ jp: 'ゲーム', en: 'Game' }], [line])[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBe(20)
    expect(result.left).toBeCloseTo(10 + (4 / 7) * 100, 5)
    expect(result.width).toBeCloseTo((3 / 7) * 100, 5)
  })

  it('多行时命中对应的行', () => {
    const lines = [
      makeLine({ x: 5, y: 20, width: 90, height: 14, text: '前の行' }),
      makeLine({ x: 10, y: 40, width: 100, height: 14, text: 'アニメとゲーム' })
    ]
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], lines)[0]
    expect(result.lineIndex).toBe(1)
    expect(result.top).toBe(40)
  })

  it('同名片段出现在多行时取首行', () => {
    const lines = [
      makeLine({ x: 10, y: 20, width: 100, height: 14, text: 'アニメ' }),
      makeLine({ x: 10, y: 40, width: 100, height: 14, text: 'アニメ2' })
    ]
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], lines)[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBe(20)
  })

  it('保留匹配原文与翻译字段', () => {
    const result = getMeasuredMatches(
      [{ jp: 'アニメ', en: 'Anime', type: 'title', bold: true }],
      [line]
    )[0]
    expect(result).toMatchObject({ jp: 'アニメ', en: 'Anime', type: 'title', bold: true })
  })
})

describe('shouldRenderKatakana', () => {
  const base = { jp: 'アニメ', en: 'Anime', lineIndex: 2, top: 100 }

  it('未设置 numberOfLines 时始终渲染', () => {
    expect(shouldRenderKatakana({ ...base, lineIndex: 5, top: 999 }, 14)).toBe(true)
  })

  it('numberOfLines 为 1 时仅渲染首行', () => {
    expect(shouldRenderKatakana({ ...base, lineIndex: 0 }, 14, 1)).toBe(true)
    expect(shouldRenderKatakana({ ...base, lineIndex: 1, top: 0 }, 14, 1)).toBe(false)
  })

  it('首行始终渲染', () => {
    expect(shouldRenderKatakana({ ...base, lineIndex: 0, top: 0 }, 14, 3)).toBe(true)
  })

  it('非首行在截断阈值内渲染', () => {
    // 阈值 = 3 * 14 * 1.2 = 50.4, top=40 在范围内
    expect(shouldRenderKatakana({ ...base, lineIndex: 1, top: 40 }, 14, 3)).toBe(true)
  })

  it('非首行超出截断阈值不渲染', () => {
    // top=60 > 50.4, 视为被 numberOfLines 截断
    expect(shouldRenderKatakana({ ...base, lineIndex: 1, top: 60 }, 14, 3)).toBe(false)
  })
})
