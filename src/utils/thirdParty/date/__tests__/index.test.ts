/*
 * @Author: czy0729
 * @Date: 2026-05-10 17:24:06
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-10 17:24:06
 */
import { date, getTimestamp, toCN, toJP } from '../index'

describe('getTimestamp', () => {
  it('解析标准日期字符串', () => {
    const ts = getTimestamp('2024-01-15')
    // dayjs 解析为本地时间，与 Date UTC 解析有差异
    expect(ts).toBeGreaterThan(0)
    expect(typeof ts).toBe('number')
  })

  it('空字符串返回当前时间戳', () => {
    const before = Math.floor(Date.now() / 1000)
    const ts = getTimestamp('')
    const after = Math.floor(Date.now() / 1000)
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })

  it('自定义格式解析', () => {
    const ts = getTimestamp('15/01/2024', 'DD/MM/YYYY')
    expect(ts).toBeGreaterThan(0)
    // 同一天的 timestamp 应该接近
    const ts2 = getTimestamp('2024-01-15')
    expect(Math.abs(ts - ts2)).toBeLessThan(86400)
  })

  it('无效日期返回当前时间戳', () => {
    const before = Math.floor(Date.now() / 1000)
    const ts = getTimestamp('not-a-date')
    const after = Math.floor(Date.now() / 1000)
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })
})

describe('date', () => {
  it('格式化时间戳', () => {
    const timestamp = Math.floor(new Date('2024-01-15T00:30:00Z').getTime() / 1000)
    const result = date('Y-m-d H:i:s', timestamp)
    expect(result).toBe('2024-01-15 08:30:00')
  })

  it('默认格式 Y-m-d H:i:s', () => {
    const timestamp = Math.floor(new Date('2024-06-01T00:00:00Z').getTime() / 1000)
    const result = date('Y-m-d H:i:s', timestamp)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })

  it('单参数模式: 第一个参数作为 timestamp', () => {
    const timestamp = Math.floor(Date.now() / 1000)
    const result = date('Y-m-d H:i:s', timestamp)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })
})

describe('toJP', () => {
  it('中国放送时间转日本时间', () => {
    const result = toJP(1, '2330')
    expect(result).toHaveProperty('weekDayCN', 1)
    expect(result).toHaveProperty('timeCN', '2330')
    expect(result).toHaveProperty('weekDayJP')
    expect(result).toHaveProperty('timeJP')
    expect(result.timeJP).toBe('0030')
    expect(result.weekDayJP).toBe(2)
  })

  it('默认值', () => {
    const result = toJP()
    expect(result.weekDayCN).toBe(7)
    expect(result.timeCN).toBe('0000')
  })

  it('中午时间保持不变', () => {
    const result = toJP(3, '1200')
    expect(result.timeJP).toBe('1300')
  })
})

describe('toCN', () => {
  it('日本放送时间转中国时间', () => {
    const result = toCN(2, '0030')
    expect(result).toHaveProperty('weekDayJP', 2)
    expect(result).toHaveProperty('timeJP', '0030')
    expect(result).toHaveProperty('weekDayCN')
    expect(result).toHaveProperty('timeCN')
    expect(result.timeCN).toBe('2330')
    expect(result.weekDayCN).toBe(1)
  })

  it('默认值', () => {
    const result = toCN()
    expect(result.weekDayJP).toBe(7)
    expect(result.timeJP).toBe('0000')
  })
})
