/*
 * @Author: czy0729
 * @Date: 2026-08-15 07:37:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-15 07:37:38
 */
import { ROMAJI_WIDTH_RATIO } from '../../ds'
import { getMeasuredMatches, shouldIncreaseLineHeight, shouldRenderKatakana } from '../utils'

import type { TextLayoutLine } from 'react-native'

jest.mock('@utils/dev', () => ({
  rc: (_parent, name) => String(name),
  logger: {
    log: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    yellow: jest.fn()
  }
}))

/** 估算罗马音宽度 */
const rw = (en: string, size: number) => en.length * size * ROMAJI_WIDTH_RATIO

/** 生成 TextLayoutLine 测试数据 */
const makeLine = (over: Partial<TextLayoutLine>): TextLayoutLine => ({
  x: 0,
  y: 0,
  width: 0,
  height: 23,
  text: '',
  ascender: 14,
  capHeight: 9,
  descender: 4,
  xHeight: 0,
  ...over
})

const line = makeLine({ x: 10, y: 20, width: 100, text: 'アニメとゲーム' })

describe('getMeasuredMatches', () => {
  it('matches 为空返回空数组', () => {
    expect(getMeasuredMatches([], [line], 8, 14)).toEqual([])
  })

  it('lines 为空返回空数组', () => {
    expect(getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [], 8, 14)).toEqual([])
  })

  it('匹配不存在的行被过滤', () => {
    expect(getMeasuredMatches([{ jp: 'サッカー', en: 'Soccer' }], [line], 8, 14)).toEqual([])
  })

  it('行首片段: 位置按行内比例计算', () => {
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [line], 8, 14)[0]
    expect(result.lineIndex).toBe(0)
    // capTop = 20+14-9 = 25, (asc-desc)+(asc-cap) = 10+5 = 15, top = 25 - 15*8/14
    expect(result.top).toBeCloseTo(25 - 15 * (8 / 14), 5)
    // 盒 [10, 10+3/7*100], 罗马音宽 40R, 居中
    expect(result.left).toBeCloseTo(10 + ((3 / 7) * 100 - rw('Anime', 8)) / 2, 5)
    expect(result.width).toBeCloseTo((3 / 7) * 100, 5)
    expect(result.lineWidth).toBe(100)
  })

  it('行中片段: 水平位置包含偏移量', () => {
    // 'アニメ' 3 字 + 'と' 1 字, 故 'ゲーム' 偏移量为 4
    const result = getMeasuredMatches([{ jp: 'ゲーム', en: 'Game' }], [line], 8, 14)[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBeCloseTo(25 - 15 * (8 / 14), 5)
    // 盒 [10+4/7*100, 10+3/7*100], 罗马音宽 32R, 居中
    expect(result.left).toBeCloseTo(10 + (4 / 7) * 100 + ((3 / 7) * 100 - rw('Game', 8)) / 2, 5)
    expect(result.width).toBeCloseTo((3 / 7) * 100, 5)
  })

  it('多行时命中对应的行', () => {
    const lines = [
      makeLine({ x: 5, y: 20, width: 90, text: '前の行' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'アニメとゲーム' })
    ]
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], lines, 8, 14)[0]
    expect(result.lineIndex).toBe(1)
    // capTop = 40+14-9 = 45
    expect(result.top).toBeCloseTo(45 - 15 * (8 / 14), 5)
  })

  it('同名片段出现在多行时取首行', () => {
    const lines = [
      makeLine({ x: 10, y: 20, width: 100, text: 'アニメ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'アニメ2' })
    ]
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], lines, 8, 14)[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBeCloseTo(25 - 15 * (8 / 14), 5)
    // 整行为片假名, 盒 [10, 110], 居中
    expect(result.left).toBeCloseTo(10 + (100 - rw('Anime', 8)) / 2, 5)
  })

  it('单词被换行截断时显示在起始行', () => {
    // 'ワンピース' 被截断为 'ワン' | 'ピース', 前缀 'ワン' 落在首行结尾
    const wrapped = [
      makeLine({ x: 10, y: 20, width: 100, text: '前のワン' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'ピースだ' })
    ]
    const result = getMeasuredMatches([{ jp: 'ワンピース', en: 'One Piece' }], wrapped, 8, 14)[0]
    expect(result.lineIndex).toBe(0)
    expect(result.top).toBeCloseTo(25 - 15 * (8 / 14), 5)
    // 盒 [10+2/4*100, 50], 罗马音宽 35.2, 居中
    expect(result.left).toBeCloseTo(10 + (2 / 4) * 100 + (50 - rw('One Piece', 8)) / 2, 5)
    expect(result.width).toBeCloseTo((2 / 4) * 100, 5)
  })

  it('截断时取最长前缀所在行', () => {
    // 首行以 'ワンピ' (3字) 结尾, 次行以 'ワン' (2字) 结尾, 应取最长前缀的首行
    const wrapped = [
      makeLine({ x: 10, y: 20, width: 100, text: '前のワンピ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'はワン' })
    ]
    const result = getMeasuredMatches([{ jp: 'ワンピース', en: 'One Piece' }], wrapped, 8, 14)[0]
    expect(result.lineIndex).toBe(0)
    // 盒 [10+2/5*100, 3/5*100]
    expect(result.left).toBeCloseTo(
      10 + (2 / 5) * 100 + ((3 / 5) * 100 - rw('One Piece', 8)) / 2,
      5
    )
    expect(result.width).toBeCloseTo((3 / 5) * 100, 5)
  })

  it('按字体度量锚定: 罗马音底边锚定在槽位处', () => {
    // capTop = 20+16-11 = 25, (asc-desc)+(asc-cap) = 12+5 = 17, top = 25 - 17*9/15
    const metricLine = makeLine({
      x: 10,
      y: 20,
      width: 100,
      text: 'アニメとゲーム',
      height: 24,
      ascender: 16,
      capHeight: 11,
      descender: 4
    })
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [metricLine], 9, 15)[0]
    expect(result.top).toBeCloseTo(25 - 17 * (9 / 15), 5)
  })

  it('行高收敛后按行高差比例补偿罗马音上移', () => {
    // 收敛态行高 15 (满行高 22), 基底文字上移 comp = (asc/height) * (22-15)
    const converged = makeLine({
      x: 10,
      y: 20,
      width: 100,
      text: 'アニメとゲーム',
      height: 15,
      ascender: 10.64,
      descender: 4.36
    })
    const [compensated, plain] = [
      getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [converged], 8, 12, 22)[0],
      getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [converged], 8, 12)[0]
    ]
    const comp = (10.64 / 15) * (22 - 15)
    expect(compensated.top).toBeCloseTo(21.64 - ((2 * 10.64 - 4.36 - 9) * 8) / 12 - comp, 5)
    // 满行高态 (fullLineHeight 默认 0) 不做补偿
    expect(plain.top).toBeCloseTo(21.64 - ((2 * 10.64 - 4.36 - 9) * 8) / 12, 5)
    expect(compensated.top).toBeLessThan(plain.top)
  })

  it('字体度量缺失时回退为 line.y - size', () => {
    const noMetrics = {
      ...makeLine({ x: 10, y: 20, width: 100, text: 'アニメとゲーム' }),
      descender: undefined
    } as unknown as TextLayoutLine
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [noMetrics], 9, 15)[0]
    expect(result.top).toBe(20 - 9)
  })

  it('保留匹配原文与翻译字段', () => {
    const result = getMeasuredMatches(
      [{ jp: 'アニメ', en: 'Anime', type: 'title', bold: true }],
      [line],
      8,
      14
    )[0]
    expect(result).toMatchObject({ jp: 'アニメ', en: 'Anime', type: 'title', bold: true })
  })
})

describe('水平布局', () => {
  const single = makeLine({ x: 10, y: 20, width: 100, text: 'アニメ' })

  it('单匹配: 罗马音窄于片假名盒时居中', () => {
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [single], 8, 14)[0]
    expect(result.left).toBeCloseTo(10 + (100 - rw('Anime', 8)) / 2, 5)
  })

  it('单匹配: 居中后超出右边界则贴右', () => {
    // 盒 [126.67, 210], 罗马音宽 92.4, 居中后右边界 214.5 > 210, 贴右
    const nearRight = makeLine({ x: 10, y: 20, width: 200, text: 'アニメとゲームワンピース' })
    const result = getMeasuredMatches(
      [{ jp: 'ワンピース', en: 'x'.repeat(21) }],
      [nearRight],
      8,
      14
    )[0]
    expect(result.left).toBeCloseTo(210 - rw('x'.repeat(21), 8), 5)
  })

  it('单匹配: 罗马音宽于整行时贴左', () => {
    // 盒 [10, 110], 罗马音宽 132 > 行宽, 无法容纳, 贴左
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'x'.repeat(30) }], [single], 8, 14)[0]
    expect(result.left).toBe(10)
  })

  it('多匹配: 不重叠时各自居中', () => {
    const result = getMeasuredMatches(
      [
        { jp: 'アニメ', en: 'Anime' },
        { jp: 'ゲーム', en: 'Game' }
      ],
      [line],
      8,
      14
    )
    expect(result[0].left).toBeCloseTo(10 + ((3 / 7) * 100 - rw('Anime', 8)) / 2, 5)
    expect(result[1].left).toBeCloseTo(10 + (4 / 7) * 100 + ((3 / 7) * 100 - rw('Game', 8)) / 2, 5)
  })

  it('多匹配: 重叠时在片假名跨距内均匀分布', () => {
    const result = getMeasuredMatches(
      [
        { jp: 'アニメ', en: 'Animeeeeeeeee' },
        { jp: 'ゲーム', en: 'Gameeeeeeeeee' }
      ],
      [line],
      8,
      14
    )
    // 跨距 [10, 110], 首贴左, 末贴右
    expect(result[0].left).toBe(10)
    expect(result[1].left).toBeCloseTo(110 - rw('Gameeeeeeeeee', 8), 5)
  })

  it('多匹配: 三个重叠时均分空隙', () => {
    const three = makeLine({ x: 10, y: 20, width: 100, text: 'アゲワ' })
    const result = getMeasuredMatches(
      [
        { jp: 'ア', en: 'a'.repeat(13) },
        { jp: 'ゲ', en: 'g'.repeat(13) },
        { jp: 'ワ', en: 'w'.repeat(13) }
      ],
      [three],
      8,
      14
    )
    const widths = result.map(item => rw(item.en, 8))
    // 首贴跨距左
    expect(result[0].left).toBe(10)
    // 相邻空隙相等
    const gaps = result
      .slice(0, 2)
      .map((item, index) => result[index + 1].left - (item.left + widths[index]))
    expect(gaps[0]).toBeCloseTo(gaps[1], 5)
    // 末贴跨距右
    expect(result[2].left + widths[2]).toBeCloseTo(110, 5)
  })
})

describe('shouldIncreaseLineHeight', () => {
  const base = { jp: 'アニメ', en: 'Anime', lineIndex: 0 }

  it('无匹配时不需要撑高', () => {
    expect(shouldIncreaseLineHeight([])).toBe(false)
  })

  it('仅首行有罗马音时不需要撑高', () => {
    expect(shouldIncreaseLineHeight([base])).toBe(false)
  })

  it('存在非首行罗马音时需要撑高', () => {
    expect(shouldIncreaseLineHeight([base, { jp: 'ゲーム', en: 'Game', lineIndex: 1 }])).toBe(true)
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
