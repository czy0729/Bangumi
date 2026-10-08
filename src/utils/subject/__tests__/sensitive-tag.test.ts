/*
 * @Author: czy0729
 * @Date: 2026-10-04 22:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-09 06:12:51
 *
 * sensitive-tag.ts 单元测试
 *  - 词表守卫: 任何增删都必须重跑本测试, 语料来自 typerank 五类全量标签
 */
import fs from 'fs'
import path from 'path'
import protobuf from 'protobufjs'
import { isSensitiveTag, SENSITIVE_TAG_WORDS } from '../sensitive-tag'

/** 全量标签语料 (typerank 五类, 取自 src/assets/proto/{type}-ranks 的发布资产) */
const CORPUS = ['anime', 'book', 'game', 'music', 'real'].flatMap(type => {
  const dir = path.resolve(__dirname, `../../../../src/assets/proto/${type}-ranks`)
  const { root } = protobuf.parse(fs.readFileSync(path.join(dir, 'proto/index.proto'), 'utf-8'))
  const Message = root.lookupType('Payload')
  const decoded = Message.decode(fs.readFileSync(path.join(dir, 'bin/index.bin')))
  const { payload } = Message.toObject(decoded, {
    longs: Number,
    enums: Number,
    bytes: String
  })
  return payload.map((item: { k: string }) => item.k)
}) as string[]

/**
 * 语料里允许被过滤掉的全部标签 (逐条人工确认过语义即敏感)
 *  - 新增任何一个敏感标签都必须同步补进这里, 否则本测试失败
 *  - 这里只允许增不允许减: 少一个说明有词被误删, 多一个说明有词误伤了正常标签
 */
const EXPECTED_HIT = [
  '18+',
  '18X',
  '18禁',
  '3D里番',
  '3P',
  '4X',
  'BDSM',
  'loli',
  'Loli',
  'LOLI',
  'LOLI控',
  'NSFW',
  'NTR',
  'R-18',
  'R-18G',
  'R15',
  'R18',
  'R18G',
  'SM',
  'エロ',
  'エロい',
  'エロイット',
  'エロゲ',
  'エロゲー',
  '专治妹控',
  '乱交',
  '乱交派对Orz',
  '乱伦',
  '乳摇',
  '人妻',
  '兄控',
  '凌辱',
  '出轨',
  '卖肉',
  '变态',
  '口交',
  '口交本',
  '妹控',
  '姐控',
  '小黄油',
  '工口',
  '工口漫画',
  '巨乳',
  '巨乳フェチ',
  '师生恋',
  '幼驯染',
  '微エロ',
  '性癖',
  '情色',
  '成人向',
  '成人漫画',
  '成年コミック',
  '打飞机',
  '扶他',
  '拔作',
  '无码',
  '本子',
  '正太',
  '泡面里番',
  '痴女',
  '痴汉',
  '监禁',
  '群交',
  '肉',
  '肉番',
  '肛交',
  '背德',
  '色情',
  '萝莉',
  '触手',
  '触手产物',
  '调教',
  '足控',
  '轻エロ',
  '里番',
  '限制',
  '露出',
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
    expect(isSensitiveTag('LOLI控')).toBe(true)

    const tags = [
      'LapinTrack',
      'Ubisoft Montreal (Ubisoft Entertainment)',
      'PLAYISM',
      'SMEE',
      'd3p',
      'hololive'
    ]
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(false))
  })

  it('整串排除档: 命中词表但语义为正常作品名', () => {
    const tags = ['エロマンガ先生', 'ブラザーピエロ']
    tags.forEach(tag => expect(isSensitiveTag(tag)).toBe(false))

    expect(isSensitiveTag('エロゲ')).toBe(true)
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
