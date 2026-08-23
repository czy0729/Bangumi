/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:26:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-24 00:26:26
 *
 * 纯函数测试, 无需 mock
 * 断言依赖 GMT+8 时区, 文件顶部统一设置
 */
process.env.TZ = 'Asia/Shanghai'

import dayjs from 'dayjs'
import { formatCalendarDate, parseReleaseDate } from '../utils'

describe('parseReleaseDate', () => {
  it('中文日期转 YYYY-MM-DD', () => {
    expect(parseReleaseDate('1998年11月21日')).toBe('1998-11-21')
  })

  it('不补零的中文日期输出补零', () => {
    expect(parseReleaseDate('2004年4月5日')).toBe('2004-04-05')
  })

  it('日期文字后有多余内容时提取日期部分', () => {
    expect(parseReleaseDate('1998年11月21日发售')).toBe('1998-11-21')
  })

  it('标准格式原样保留', () => {
    expect(parseReleaseDate('2004-04-28')).toBe('2004-04-28')
  })

  it('标准格式缺位时补零', () => {
    expect(parseReleaseDate('2004-4-8')).toBe('2004-04-08')
  })

  it('剥离平台后缀', () => {
    expect(parseReleaseDate('2004-04-28(PC)')).toBe('2004-04-28')
    expect(parseReleaseDate('2004-04-28 (PC)')).toBe('2004-04-28')
  })

  it('首尾空白被忽略', () => {
    expect(parseReleaseDate('  2004-04-28  ')).toBe('2004-04-28')
  })

  it('空字符串返回 null', () => {
    expect(parseReleaseDate('')).toBe(null)
  })

  it('无法解析的文本返回 null', () => {
    expect(parseReleaseDate('TBD')).toBe(null)
    expect(parseReleaseDate('(PC)')).toBe(null)
    expect(parseReleaseDate('2026/04/28')).toBe(null)
  })

  it('非法日期返回 null', () => {
    expect(parseReleaseDate('2026-13-40')).toBe(null)
    expect(parseReleaseDate('2026-02-30')).toBe(null)
  })
})

describe('formatCalendarDate', () => {
  it('环境校验: 测试进程时区为 GMT+8', () => {
    expect(new Date().getTimezoneOffset()).toBe(-480)
  })

  it('北京时间减 8 小时后标记为 UTC', () => {
    expect(formatCalendarDate(dayjs('2024-01-15T00:00:00'))).toBe('2024-01-14T16:00:00.000Z')
    expect(formatCalendarDate(dayjs('2024-01-15T12:30:00'))).toBe('2024-01-15T04:30:00.000Z')
  })

  it('跨天跨月换算正确', () => {
    expect(formatCalendarDate(dayjs('2024-05-01T06:00:00'))).toBe('2024-04-30T22:00:00.000Z')
  })
})
