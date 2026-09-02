/*
 * @Author: czy0729
 * @Date: 2026-09-03 05:15:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-03 05:15:31
 *
 * s2t golden 对拍测试
 * 期望值录制自 opencc-js@1.0.5 (node_modules 中的上游实现), 自研引擎必须逐条一致,
 * 保证移除依赖前后转换结果零回归
 */
import { createConverter } from '../converter'
import CN from '../dict/cn'
import HK from '../dict/hk'
import TW from '../dict/tw'
import { s2t } from '../index'

let mockS2tLocal: 'tw' | 'hk' = 'tw'
jest.mock('../../../app', () => ({
  getSetting: () => ({ s2tLocal: mockS2tLocal })
}))

const GOLDEN: readonly { input: string; tw: string; hk: string }[] = [
  { input: '', tw: '', hk: '' },
  { input: 'Hello World 123 !@#', tw: 'Hello World 123 !@#', hk: 'Hello World 123 !@#' },
  { input: '万与东专丝国个书买乱', tw: '萬與東專絲國個書買亂', hk: '萬與東專絲國個書買亂' },
  { input: '里面', tw: '裡面', hk: '裏面' },
  { input: '里面有只猫', tw: '裡面有隻貓', hk: '裏面有隻貓' },
  { input: '皇后', tw: '皇后', hk: '皇后' },
  { input: '天干地支', tw: '天干地支', hk: '天干地支' },
  { input: '以后', tw: '以後', hk: '以後' },
  { input: '头发 发展', tw: '頭髮 發展', hk: '頭髮 發展' },
  { input: '软件和硬件', tw: '軟件和硬件', hk: '軟件和硬件' },
  { input: '鼠标', tw: '鼠標', hk: '鼠標' },
  { input: '信息', tw: '信息', hk: '信息' },
  { input: '超电磁炮', tw: '超電磁炮', hk: '超電磁炮' },
  { input: '凉宫春日的忧郁', tw: '涼宮春日的憂鬱', hk: '涼宮春日的憂鬱' },
  { input: '天才麻将少女', tw: '天才麻將少女', hk: '天才麻將少女' },
  { input: '爲牀祕麪着', tw: '為床秘麵著', hk: '為牀秘麪着' },
  { input: 'bangumi 番组计划 万岁!', tw: 'bangumi 番組計劃 萬歲!', hk: 'bangumi 番組計劃 萬歲!' },
  {
    input: '「简繁转换」测试 (2010)',
    tw: '「簡繁轉換」測試 (2010)',
    hk: '「簡繁轉換」測試 (2010)'
  },
  { input: '第1话 兽耳娘与机械义肢', tw: '第1話 獸耳娘與機械義肢', hk: '第1話 獸耳娘與機械義肢' },
  {
    input: '简体 and English 混排 123',
    tw: '簡體 and English 混排 123',
    hk: '簡體 and English 混排 123'
  },
  { input: ' произвольный 简体', tw: ' произвольный 簡體', hk: ' произвольный 簡體' },
  { input: '   ', tw: '   ', hk: '   ' },
  { input: '「」『』【】', tw: '「」『』【】', hk: '「」『』【】' },
  { input: '𠀀', tw: '𠀀', hk: '𠀀' },
  { input: '🎬𠀀abc', tw: '🎬𠀀abc', hk: '🎬𠀀abc' },
  { input: '⿱士口', tw: '⿱士口', hk: '⿱士口' },
  { input: '⿰⿱⺈⺆口木', tw: '⿰⿱⺈⺆口木', hk: '⿰⿱⺈⺆口木' },
  { input: '后後', tw: '後後', hk: '後後' },
  { input: '简体與繁體', tw: '簡體與繁體', hk: '簡體與繁體' },
  { input: '一二三四五六七八九十', tw: '一二三四五六七八九十', hk: '一二三四五六七八九十' },
  { input: '人山人海', tw: '人山人海', hk: '人山人海' },
  { input: '測試測試測試', tw: '測試測試測試', hk: '測試測試測試' }
]

describe('converter (引擎层, 双 locale 对拍 opencc-js)', () => {
  const tw = createConverter([CN, TW])
  const hk = createConverter([CN, HK])

  GOLDEN.forEach(({ input, tw: twExpected, hk: hkExpected }) => {
    it(JSON.stringify(input), () => {
      expect(tw(input)).toBe(twExpected)
      expect(hk(input)).toBe(hkExpected)
    })
  })
})

describe('s2t (包装层: locale 切换 / 缓存 / 直通)', () => {
  beforeEach(() => {
    mockS2tLocal = 'tw'
  })

  it('默认 tw locale 转换', () => {
    expect(s2t('里面')).toBe('裡面')
  })

  it('hk locale 转换', () => {
    mockS2tLocal = 'hk'
    expect(s2t('里面')).toBe('裏面')
  })

  it('无中文直通', () => {
    expect(s2t('Hello 123')).toBe('Hello 123')
  })

  it('非字符串入参原样返回', () => {
    expect(s2t(undefined as never)).toBe(undefined)
    expect(s2t(null as never)).toBe(null)
  })

  it('重复调用结果一致 (memo 命中)', () => {
    expect(s2t('测试测试')).toBe(s2t('测试测试'))
  })

  it('转换幂等', () => {
    const once = s2t('简化字与繁体字混排')
    expect(s2t(once)).toBe(once)
  })
})
