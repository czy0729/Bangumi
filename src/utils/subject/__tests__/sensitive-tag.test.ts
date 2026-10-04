/*
 * @Author: czy0729
 * @Date: 2026-10-04 22:56:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-10-04 22:56:39
 *
 * sensitive-tag.ts 单元测试
 *  - 词表守卫: 任何增删都必须重跑本测试, 语料来自 typerank 五类全量标签
 */
import { isSensitiveTag, SENSITIVE_TAG_WORDS } from '../sensitive-tag'

/** 全量标签语料 (typerank 五类: anime / book / game / music / real) */
const CORPUS = [
  require('@assets/json/typerank/anime.json'),
  require('@assets/json/typerank/book.json'),
  require('@assets/json/typerank/game.json'),
  require('@assets/json/typerank/music.json'),
  require('@assets/json/typerank/real.json')
].flatMap((item: Record<string, unknown>) => Object.keys(item)) as string[]

/**
 * 语料里允许被过滤掉的全部标签 (逐条人工确认过语义即敏感)
 *  - 新增任何一个敏感标签都必须同步补进这里, 否则本测试失败
 *  - 这里只允许增不允许减: 少一个说明有词被误删, 多一个说明有词误伤了正常标签
 */
const EXPECTED_HIT = [
  '18+',
  '18X',
  '4X',
  'loli',
  'Loli',
  'LOLI',
  'NTR',
  'R15',
  'R18',
  'SM',
  'エロ',
  '乱交',
  '乱伦',
  '乳摇',
  '人妻',
  '兄控',
  '出轨',
  '卖肉',
  '变态',
  '妹控',
  '姐控',
  '工口',
  '巨乳',
  '师生恋',
  '幼驯染',
  '性癖',
  '成人向',
  '成人漫画',
  '成年コミック',
  '打飞机',
  '拔作',
  '本子',
  '正太',
  '监禁',
  '肉',
  '肉番',
  '背德',
  '萝莉',
  '触手',
  '触手产物',
  '足控',
  '里番',
  '限制',
  '黄油'
]

describe('isSensitiveTag', () => {
  it('空值与非字符串输入返回 false', () => {
    expect(isSensitiveTag('')).toBe(false)
    expect(isSensitiveTag(null as any)).toBe(false)
    expect(isSensitiveTag(undefined as any)).toBe(false)
    expect(isSensitiveTag(123 as any)).toBe(false)
  })

  it('分级标记全部命中', () => {
    const tags = ['R18', 'R-18', '18X', '18+', '18禁', 'R15', '4X', 'loli', 'LOLI', 'bdsm']
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(true))
  })

  it('中文与日文硬露骨词全部命中', () => {
    const tags = [
      '成年コミック',
      'エロ',
      '工口',
      '本子',
      '里番',
      '肉番',
      '巨乳',
      '萝莉',
      '卖肉',
      '人妻',
      '乳摇',
      '成人漫画',
      '成人向',
      '限制',
      '凌辱',
      '调教'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(true))
  })

  it('性癖与性行为词全部命中', () => {
    const tags = [
      '性癖',
      '乱伦',
      '出轨',
      '乱交',
      '监禁',
      '背德',
      '师生恋',
      '妹控',
      '兄控',
      '姐控',
      '足控',
      '幼驯染',
      '拔作',
      '黄油',
      '痴女',
      '痴汉',
      '扶他',
      '近亲',
      '逆强制',
      '口交',
      '群交',
      '内射',
      '肉便器',
      '自慰',
      '精神控制'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(true))
  })

  it('整串相等档: 单字词只命中自身', () => {
    const tags = ['肉', '变态', '正太', '触手', '强制']
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(true))
  })

  it('整串相等档: 不连带命中含该字的正常标签', () => {
    const tags = [
      '肉鸽',
      '生肉',
      '肉片',
      '行尸走肉',
      '变态王子与不笑猫',
      '得能正太郎',
      '触手猴',
      '强制冷静'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(false))
  })

  it('单词边界档: 短词命中且不误伤包含它的无关标签', () => {
    expect(isSensitiveTag('NTR')).toBe(true)
    expect(isSensitiveTag('NTR剧情')).toBe(true)
    expect(isSensitiveTag('SM')).toBe(true)
    expect(isSensitiveTag('3P')).toBe(true)

    const tags = [
      'LapinTrack',
      'Ubisoft Montreal (Ubisoft Entertainment)',
      'PLAYISM',
      'SMEE',
      'd3p'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(false))
  })

  it('题材与资源义标签一律不命中', () => {
    const tags = [
      '生肉',
      '后宫',
      '百合',
      '耽美',
      '纯爱',
      '一般向',
      '全年龄',
      'JK',
      '幼女向',
      '福利',
      '色气',
      '绅士',
      '涩涩',
      '猎奇',
      '重口',
      '鬼畜',
      '处女',
      '玩具',
      '骨科'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(false))
  })

  it('全量语料的命中集合与人工确认清单完全一致 (多出即误伤, 少了即漏词)', () => {
    const matched = [...new Set(CORPUS.filter(tag => isSensitiveTag(tag)))].sort((a, b) =>
      a.localeCompare(b)
    )

    expect(matched).toEqual(EXPECTED_HIT)
  })

  it('词表非空 (防止被清空而测试仍通过)', () => {
    expect(SENSITIVE_TAG_WORDS.length).toBeGreaterThan(30)
  })
})
