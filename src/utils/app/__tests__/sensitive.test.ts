/*
 * @Author: czy0729
 * @Date: 2026-05-17
 */
jest.mock('../../crypto', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => JSON.stringify(['敏感词A', '敏感词B', '测试敏感']))
  }
}))

import { detectSensitiveWords } from '../sensitive'

describe('detectSensitiveWords', () => {
  it('输入包含敏感词时返回匹配的词列表', () => {
    const result = detectSensitiveWords('这是敏感词A的内容')
    expect(result).toContain('敏感词A')
  })

  it('输入不包含敏感词时返回空数组', () => {
    const result = detectSensitiveWords('这是正常内容')
    expect(result).toEqual([])
  })

  it('输入包含多个敏感词时返回所有匹配', () => {
    const result = detectSensitiveWords('包含敏感词A和敏感词B')
    expect(result).toContain('敏感词A')
    expect(result).toContain('敏感词B')
    expect(result).toHaveLength(2)
  })

  it('空字符串返回空数组', () => {
    expect(detectSensitiveWords('')).toEqual([])
  })

  it('非字符串输入返回空数组', () => {
    expect(detectSensitiveWords(null as any)).toEqual([])
    expect(detectSensitiveWords(undefined as any)).toEqual([])
    expect(detectSensitiveWords(123 as any)).toEqual([])
  })

  // [问题] SENSITIVE_WORDS 在模块加载时确定，运行时无法更新
  it('[问题] 敏感词列表在模块加载时确定，运行时无法更新', () => {
    const Crypto = require('../../crypto').default
    Crypto.get.mockReturnValueOnce(['新词'])
    // SENSITIVE_WORDS 已经在 import 时确定，重新 mock 不影响已有实例
    expect(detectSensitiveWords('敏感词A')).toContain('敏感词A')
  })
})
