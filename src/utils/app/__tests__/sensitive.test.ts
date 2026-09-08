/*
 * @Author: czy0729
 * @Date: 2026-05-17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * sensitive.ts 单元测试
 */
jest.mock('../../thirdParty/crypto', () => ({
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

  it('词库懒加载且只解密一次, 后续调用复用', () => {
    const Crypto = require('../../thirdParty/crypto').default
    const calls = Crypto.get.mock.calls.length
    expect(calls).toBeGreaterThan(0)

    detectSensitiveWords('敏感词A')
    detectSensitiveWords('敏感词B')
    expect(Crypto.get.mock.calls.length).toBe(calls)
  })

  it('解密失败时返回空数组且不抛错', () => {
    jest.resetModules()

    const Crypto = require('../../thirdParty/crypto').default
    Crypto.get.mockImplementationOnce(() => {
      throw new Error('cipher broken')
    })

    const { detectSensitiveWords: detect } = require('../sensitive')
    expect(() => detect('敏感词A')).not.toThrow()
    expect(detect('敏感词A')).toEqual([])
  })
})
