/*
 * @Author: czy0729
 * @Date: 2026-08-25 17:49:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-25 17:49:42
 */
import { s2t, t2s } from '../index'
import sc from '../sc.json'
import tc from '../tc.json'

describe('数据完整性', () => {
  it('简繁字表等长 (Map 构建依赖此不变量)', () => {
    expect(sc.length).toBe(tc.length)
  })

  it('字表非空', () => {
    expect(sc.length).toBeGreaterThan(0)
  })
})

describe('s2t', () => {
  it('默认参数返回空字符串', () => {
    expect(s2t()).toBe('')
    expect(s2t('')).toBe('')
  })

  it('已知简体字转换为繁体', () => {
    expect(s2t('万与东专丝国个书买乱')).toBe('萬與東專絲國個書買亂')
    expect(s2t('体简测试')).toBe('體簡測試')
  })

  it('非中文字符原样保留', () => {
    expect(s2t('abc 123 !@#')).toBe('abc 123 !@#')
    expect(s2t('🎬𠀀')).toBe('🎬𠀀')
  })

  it('混合字符串只转换中文', () => {
    expect(s2t('测试Test123！')).toBe('測試Test123！')
  })

  it('已是繁体的字符原样返回', () => {
    expect(s2t('萬與東')).toBe('萬與東')
  })

  it('转换幂等', () => {
    const once = s2t('简化字与繁体字混排')
    expect(s2t(once)).toBe(once)
  })

  it('重复调用结果一致', () => {
    expect(s2t('测试')).toBe(s2t('测试'))
  })
})

describe('t2s', () => {
  it('空字符串返回空字符串', () => {
    expect(t2s('')).toBe('')
  })

  it('已知繁体字转换为简体', () => {
    expect(t2s('萬與東專絲國個書買亂')).toBe('万与东专丝国个书买乱')
    expect(t2s('體簡測試')).toBe('体简测试')
    expect(t2s('（僅限港澳台地區）')).toBe('（仅限港澳台地区）')
  })

  it('非中文字符原样保留', () => {
    expect(t2s('abc 123 !@#')).toBe('abc 123 !@#')
    expect(t2s('🎬𠀀')).toBe('🎬𠀀')
  })

  it('已是简体的字符原样返回', () => {
    expect(t2s('万与东')).toBe('万与东')
  })

  it('转换幂等', () => {
    const once = t2s('繁體字與簡體字混排')
    expect(t2s(once)).toBe(once)
  })

  it('重复调用结果一致 (热路径缓存正确性)', () => {
    expect(t2s('測試')).toBe(t2s('測試'))
  })
})
