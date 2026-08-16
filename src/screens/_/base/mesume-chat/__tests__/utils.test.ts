/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { getTextSize, splitParagraphs } from '../utils'

describe('getTextSize', () => {
  it('短文本返回 14', () => {
    expect(getTextSize('')).toBe(14)
    expect(getTextSize('a'.repeat(199))).toBe(14)
  })

  it('200 字及以上返回 13', () => {
    expect(getTextSize('a'.repeat(200))).toBe(13)
    expect(getTextSize('a'.repeat(299))).toBe(13)
  })

  it('300 字及以上返回 12', () => {
    expect(getTextSize('a'.repeat(300))).toBe(12)
    expect(getTextSize('a'.repeat(500))).toBe(12)
  })
})

describe('splitParagraphs', () => {
  it('单段返回单元素数组', () => {
    expect(splitParagraphs('你好')).toHaveLength(1)
  })

  it('按空行分割为多段', () => {
    expect(splitParagraphs('第一段\n\n第二段\n\n第三段')).toEqual(['第一段', '第二段', '第三段'])
  })

  it('连续空行时后续段落保留前导换行', () => {
    expect(splitParagraphs('开头\n\n\n结尾')).toEqual(['开头', '\n结尾'])
  })
})