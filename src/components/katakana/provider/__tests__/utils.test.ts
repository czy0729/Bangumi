/*
 * @Author: czy0729
 * @Date: 2026-08-15 07:37:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-15 07:37:38
 */
import { ROMAJI_WIDTH_RATIO } from '../../ds'
import { getMeasuredMatches, shouldIncreaseLineHeight, shouldRenderKatakana } from '../utils'

import type { TextLayoutLine } from 'react-native'

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
    // 后缀 'ース' 不在次行开头, 单词不完整, 靠右对齐到前缀末尾 (盒 [10+2/5*100, 3/5*100] 右界)
    expect(result.left).toBeCloseTo(10 + 100 - rw('One Piece', 8), 5)
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

  it('三行标题第三行行尾被 numberOfLines 截断时仍能测量并渲染', () => {
    // 标题三行, 第三行 (lineIndex=2) 行尾片假名 'ワンピース' 被截断为可见前缀 'ワンピ'
    const truncated = [
      makeLine({ x: 10, y: 20, width: 100, text: 'アニメとゲーム' }),
      makeLine({ x: 10, y: 40, width: 100, text: '音楽を' }),
      makeLine({ x: 10, y: 60, width: 100, text: '毎日のワンピ' })
    ]
    const result = getMeasuredMatches([{ jp: 'ワンピース', en: 'One Piece' }], truncated, 8, 14)[0]
    expect(result.lineIndex).toBe(2)
    // 后缀 'ース' 无下一行承接, 单词不完整, 靠右对齐到第三行行尾
    expect(result.left).toBeCloseTo(10 + 100 - rw('One Piece', 8), 5)
    expect(shouldRenderKatakana(result, 8, 3)).toBe(true)
  })

  it('后缀跨到被 numberOfLines 截断的不可见行时靠右对齐', () => {
    // 标题 3 行, 但 onTextLayout 返回 4 行 (第 4 行实际不可见), 'パーティーメンバー' 后缀 'ー' 落第 4 行开头
    const truncated = [
      makeLine({ x: 10, y: 20, width: 100, text: '信じていた仲間達にダンジョン奥地で殺さ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'れかけたがギフト『無限ガチャ』でレベル9999' }),
      makeLine({ x: 10, y: 60, width: 100, text: 'の仲間達を手に入れて元パーティーメンバ' }),
      makeLine({ x: 10, y: 80, width: 100, text: 'ーと世界に復讐＆『ざまぁ！』します！' })
    ]
    const result = getMeasuredMatches(
      [{ jp: 'パーティーメンバー', en: 'Member party' }],
      truncated,
      8,
      14,
      0,
      3
    )[0]
    expect(result.lineIndex).toBe(2)
    expect(result.truncated).toBe(true)
    expect(result.left).toBeCloseTo(10 + 100 - rw('Member party', 8), 5)
  })

  it('词完整出现在被 numberOfLines 截断的最后可见行行尾时靠右对齐', () => {
    // 3 行 lines 即可见行 (iOS 截断行 text 为完整文本), 词 'パーティーメンバー' 完整在第三行行尾
    const truncated = [
      makeLine({ x: 10, y: 20, width: 100, text: '信じていた仲間達にダンジョン奥地で殺さ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'れかけたがギフト『無限ガチャ』でレベル9999' }),
      makeLine({ x: 10, y: 60, width: 100, text: 'の仲間達を手に入れて元パーティーメンバー' })
    ]
    const result = getMeasuredMatches(
      [{ jp: 'パーティーメンバー', en: 'Member party' }],
      truncated,
      8,
      14,
      0,
      3
    )[0]
    expect(result.lineIndex).toBe(2)
    expect(result.truncated).toBe(true)
    expect(result.left).toBeCloseTo(10 + 100 - rw('Member party', 8), 5)
  })

  it('词完整在最后可见行行尾且 lines 含不可见后续行时靠右对齐', () => {
    // onTextLayout 返回 4 行 (第 4 行不可见), 第三行 text 为完整文本含完整词
    const truncated = [
      makeLine({ x: 10, y: 20, width: 100, text: '信じていた仲間達にダンジョン奥地で殺さ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'れかけたがギフト『無限ガチャ』でレベル9999' }),
      makeLine({ x: 10, y: 60, width: 100, text: 'の仲間達を手に入れて元パーティーメンバー' }),
      makeLine({ x: 10, y: 80, width: 100, text: 'ーと世界に復讐＆『ざまぁ！』します！' })
    ]
    const result = getMeasuredMatches(
      [{ jp: 'パーティーメンバー', en: 'Member party' }],
      truncated,
      8,
      14,
      0,
      3
    )[0]
    expect(result.lineIndex).toBe(2)
    expect(result.truncated).toBe(true)
    expect(result.left).toBeCloseTo(10 + 100 - rw('Member party', 8), 5)
  })

  it('词完整在最后可见行行中 (词后内容被省略号覆盖) 时靠右对齐到行尾', () => {
    // iOS 截断行 text 为完整剩余文本, 词完整但词尾之后内容实际被省略号覆盖,
    // 视觉上词在行尾, 靠右对齐到可见行尾
    const truncated = [
      makeLine({ x: 10, y: 20, width: 100, text: '信じていた仲間達にダンジョン奥地で殺され' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'かけたがギフト『無限ガチャ』でレベル 9999' }),
      makeLine({
        x: 10,
        y: 60,
        width: 100,
        text: 'の仲間達を手に入れて元パーティーメンバーと世界に復讐＆『ざまぁ！』します！'
      })
    ]
    const result = getMeasuredMatches(
      [{ jp: 'パーティーメンバー', en: 'Member party' }],
      truncated,
      8,
      14,
      0,
      3
    )[0]
    expect(result.lineIndex).toBe(2)
    expect(result.truncated).toBe(false)
    expect(result.lastLine).toBe(true)
    expect(result.left).toBeCloseTo(10 + 100 - rw('Member party', 8), 5)
  })

  it('numberOfLines=1 时完整剩余文本中超出可见宽度的词不渲染', () => {
    // iOS 截断行 text 为完整剩余文本 (含多行内容), 但仅首行可见; 词起点超出可见宽度的部分不可见
    const single = makeLine({ x: 10, y: 20, width: 100, text: 'アニメとゲームワンピースナルト' })
    const result = getMeasuredMatches(
      [
        { jp: 'アニメ', en: 'Anime' },
        { jp: 'ゲーム', en: 'Game' },
        { jp: 'ワンピース', en: 'One Piece' },
        { jp: 'ナルト', en: 'Naruto' }
      ],
      [single],
      8,
      14,
      0,
      1
    )
    // 可见宽度约 7 字 (100 / 14), 仅行首的 アニメ/ゲーム 保留
    expect(result.map(item => item.jp)).toEqual(['アニメ', 'ゲーム'])
  })

  it('numberOfLines=1 时文本未超行则全部渲染', () => {
    const single = makeLine({ x: 10, y: 20, width: 100, text: 'アニメ' })
    const result = getMeasuredMatches([{ jp: 'アニメ', en: 'Anime' }], [single], 8, 14, 0, 1)
    expect(result.map(item => item.jp)).toEqual(['アニメ'])
  })

  it('numberOfLines=1 未截断时单词居中于片假名盒而非贴行尾', () => {
    // 修复: 仅行被截断 (存在不可见内容) 时最后词才贴行尾, 未截断短行单词应居中
    const single = makeLine({ x: 10, y: 20, width: 100, text: 'ランス10' })
    const result = getMeasuredMatches([{ jp: 'ランス', en: 'Lance' }], [single], 8, 14, 0, 1)[0]
    // 盒 [10, 10+3/4*100], Lance 居中于盒
    expect(result.left).toBeCloseTo(10 + ((3 / 4) * 100 - rw('Lance', 8)) / 2, 5)
  })

  it('子串命中同一跨度时被认领, 重新解析到下一个未占用位置', () => {
    // 'ムリムリ' 跨行 (首行行尾 'ムリ' + 次行行头 'ムリ'),
    // 'ムリ' 初次命中首行同一跨度被认领, 重新解析到次行 'ムリじゃなかった' 里的 'ムリ'
    const lines = [
      makeLine({ x: 10, y: 20, width: 100, text: 'わたしが恋人になれるわけないじゃん、ムリ' }),
      makeLine({ x: 10, y: 40, width: 100, text: 'ムリ！（※ムリじゃなかった!?）' })
    ]
    const result = getMeasuredMatches(
      [
        { jp: 'ムリムリ', en: 'Perilla' },
        { jp: 'ムリ', en: 'Muli' }
      ],
      lines,
      8,
      14
    )
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({ jp: 'ムリムリ', lineIndex: 0 })
    // 盒 [100, 110], 罗马音宽 30.8 超盒, 居中后贴行右边界
    expect(result[0].left).toBeCloseTo(10 + 100 - rw('Perilla', 8), 5)
    expect(result[1]).toMatchObject({ jp: 'ムリ', lineIndex: 1 })
    // 行视觉宽度 14 (ゃ/っ/!? 计 0.5), 盒 [10+5/14*100, +2/14*100], 罗马音宽 17.6, 居中
    expect(result[1].left).toBeCloseTo(
      10 + (5 / 14) * 100 + ((2 / 14) * 100 - rw('Muli', 8)) / 2,
      5
    )
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

  it('被 numberOfLines 截断的可见行仍渲染', () => {
    // 第三行 (lineIndex=2) 是可见的最后一行, 行尾片假名被截断也应显示罗马音
    expect(shouldRenderKatakana({ ...base, lineIndex: 2, top: 54 }, 14, 3)).toBe(true)
  })

  it('行索引超出可见行数不渲染', () => {
    expect(shouldRenderKatakana({ ...base, lineIndex: 3, top: 60 }, 14, 3)).toBe(false)
  })
})
