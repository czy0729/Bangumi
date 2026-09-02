/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:36:37
 */
import { MESUME_COUNT, randomMesumeIndex, randomSpeech } from '../utils'

describe('randomMesumeIndex', () => {
  it('返回 1 到 MESUME_COUNT 之间的整数', () => {
    for (let i = 0; i < 100; i += 1) {
      const index = randomMesumeIndex()
      expect(Number.isInteger(index)).toBe(true)
      expect(index).toBeGreaterThanOrEqual(1)
      expect(index).toBeLessThanOrEqual(MESUME_COUNT)
    }
  })

  it('多次调用覆盖所有编号', () => {
    const hit = new Set<number>()
    for (let i = 0; i < 1000; i += 1) {
      hit.add(randomMesumeIndex())
    }
    expect(hit.size).toBe(MESUME_COUNT)
  })
})

describe('randomSpeech', () => {
  it('返回一条字符串', () => {
    expect(typeof randomSpeech()).toBe('string')
  })

  it('多次调用会返回不同的话语', () => {
    const results = new Set<string>()
    for (let i = 0; i < 1000; i += 1) {
      results.add(randomSpeech())
    }
    expect(results.size).toBeGreaterThan(1)
  })
})
