/*
 * @Author: czy0729
 * @Date: 2026-05-13
 */
import { getPinYin, getPinYinFilterValue } from '../index'

describe('getPinYin', () => {
  it('空字符串返回空拼音', () => {
    const result = getPinYin('')
    expect(result).toEqual({ str: '', pinyin: '' })
  })

  it('纯英文返回原字符串大写', () => {
    const result = getPinYin('hello')
    expect(result).toEqual({ str: 'hello', pinyin: 'HELLO' })
  })

  it('中文返回首字母', () => {
    const result = getPinYin('你好')
    expect(result.str).toBe('你好')
    expect(result.pinyin).toBe('NH')
  })

  it('过滤特殊字符', () => {
    const result = getPinYin('你!好?')
    expect(result.str).toBe('你好')
    expect(result.pinyin).toBe('NH')
  })

  it('过滤中文标点', () => {
    const result = getPinYin('你，好。')
    expect(result.str).toBe('你好')
    expect(result.pinyin).toBe('NH')
  })

  it('缓存结果', () => {
    const result1 = getPinYin('测试')
    const result2 = getPinYin('测试')
    expect(result1).toEqual(result2)
  })

  it('非字符串输入返回空拼音', () => {
    const result = getPinYin(null as any)
    expect(result).toEqual({ str: null, pinyin: '' })
  })
})

describe('getPinYinFilterValue', () => {
  it('空 filter 返回空字符串', () => {
    const result = getPinYinFilterValue('你好', '')
    expect(result).toBe('')
  })

  it('非字符串参数返回空字符串', () => {
    expect(getPinYinFilterValue(null as any, 'test')).toBe('')
    expect(getPinYinFilterValue('test', null as any)).toBe('')
  })

  it('拼音匹配英文过滤', () => {
    const result = getPinYinFilterValue('你好世界', 'nh')
    expect(result).toBe('你好')
  })

  it('拼音匹配不区分大小写', () => {
    const result = getPinYinFilterValue('你好', 'NH')
    expect(result).toBe('你好')
  })

  it('中文直接匹配', () => {
    const result = getPinYinFilterValue('你好世界', '世界')
    expect(result).toBe('世界')
  })

  it('繁体中文也能匹配', () => {
    const result = getPinYinFilterValue('你好', '你好')
    expect(result).toBe('你好')
  })

  it('不匹配时返回空字符串', () => {
    const result = getPinYinFilterValue('你好', 'xyz')
    expect(result).toBe('')
  })

  it('缓存结果', () => {
    const result1 = getPinYinFilterValue('测试', 'cs')
    const result2 = getPinYinFilterValue('测试', 'cs')
    expect(result1).toBe(result2)
  })
})
