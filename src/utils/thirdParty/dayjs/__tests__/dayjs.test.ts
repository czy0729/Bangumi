/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 19:14:53
 *
 * 自研 dayjs 与 dayjs 原版的对照测试
 *
 * 覆盖项目内实际用到的全部能力, 逐项断言与 dayjs 行为一致
 * 断言依赖 GMT+8 时区, 文件顶部统一设置
 */
process.env.TZ = 'Asia/Shanghai'

import realDayjs from 'dayjs'
import realCustomParseFormat from 'dayjs/plugin/customParseFormat'
import realIsoWeek from 'dayjs/plugin/isoWeek'
import realTimezone from 'dayjs/plugin/timezone'
import realUTC from 'dayjs/plugin/utc'
import realWeekday from 'dayjs/plugin/weekday'
import dayjs from '../index'

import type { Unit } from '../index'

realDayjs.extend(realCustomParseFormat)
realDayjs.extend(realUTC)
realDayjs.extend(realWeekday)
realDayjs.extend(realIsoWeek)
realDayjs.extend(realTimezone)

describe('解析: 无格式字符串', () => {
  const CASES = [
    '2024-01-15',
    '2024-1-5',
    '2024-01-15T00:00:00',
    '2024-01-15T12:30:45',
    '2024-01-15 08:30:00',
    '2024-01-15 12:30',
    '2024-01-15T00:00:00.000Z', // 带毫秒的 UTC 时间
    '2024-01-15T08:00:00+0800', // 无冒号时区偏移
    '2024/01/15', // 斜杠分隔
    '2019-03-30',
    '2026-02-30' // dayjs 特性: 越界日期静默进位
  ]

  CASES.forEach(input => {
    it(`dayjs('${input}') 与原版一致`, () => {
      const real = realDayjs(input)
      const mine = dayjs(input)
      expect(mine.valueOf()).toBe(real.valueOf())
      expect(mine.format('YYYY-MM-DD HH:mm:ss')).toBe(real.format('YYYY-MM-DD HH:mm:ss'))
    })
  })

  it('无参数返回当前时间', () => {
    const before = Date.now()
    const mine = dayjs()
    const after = Date.now()
    expect(mine.valueOf()).toBeGreaterThanOrEqual(before)
    expect(mine.valueOf()).toBeLessThanOrEqual(after)
  })

  it('带时区偏移字符串解析一致', () => {
    const input = '2024-01-15T23:30:00+08:00'
    expect(dayjs(input).valueOf()).toBe(realDayjs(input).valueOf())
  })

  it('无法解析的字符串为无效日期', () => {
    expect(dayjs('not-a-date').isValid()).toBe(false)
    expect(dayjs('not-a-date').valueOf()).toBeNaN()
    expect(dayjs('not-a-date').format('YYYY-MM-DD')).toBe('Invalid Date')
  })

  it('Date 实例与毫秒数输入', () => {
    const now = new Date()
    expect(dayjs(now).valueOf()).toBe(realDayjs(now).valueOf())
    expect(dayjs(now.getTime()).valueOf()).toBe(realDayjs(now.getTime()).valueOf())
  })
})

describe('解析: 自定义格式 (customParseFormat)', () => {
  const CASES: [string, string][] = [
    ['1998年11月21日', 'YYYY年M月D日'],
    ['2004年4月5日', 'YYYY年M月D日'],
    ['15/01/2024', 'DD/MM/YYYY'],
    ['2024-01-15', 'YYYY-MM-DD'],
    ['01-15 08:30', 'MM-DD HH:mm']
  ]

  CASES.forEach(([input, format]) => {
    it(`dayjs('${input}', '${format}') 与原版一致`, () => {
      const real = realDayjs(input, format)
      const mine = dayjs(input, format)
      expect(mine.valueOf()).toBe(real.valueOf())
    })
  })

  it('YY 世纪推断与原版一致 (68 归 2000 系, 69 归 1900 系)', () => {
    const YEARS = [67, 68, 69, 70]
    YEARS.forEach(y => {
      const input = `${y}-01-01`
      expect(dayjs(input, 'YY-MM-DD').year()).toBe(realDayjs(input, 'YY-MM-DD').year())
    })
  })

  it('格式不匹配返回无效日期', () => {
    expect(dayjs('not-a-date', 'YYYY-MM-DD').isValid()).toBe(false)
    expect(realDayjs('not-a-date', 'YYYY-MM-DD').isValid()).toBe(false)
  })
})

describe('取值', () => {
  const input = '2024-01-15T12:34:56'
  const real = realDayjs(input)
  const mine = dayjs(input)

  it('year / month / date / day', () => {
    expect(mine.year()).toBe(real.year())
    expect(mine.month()).toBe(real.month())
    expect(mine.date()).toBe(real.date())
    expect(mine.day()).toBe(real.day())
  })

  it('unix / valueOf', () => {
    expect(mine.unix()).toBe(real.unix())
    expect(mine.valueOf()).toBe(real.valueOf())
  })

  it('无效日期 day() 为 NaN', () => {
    expect(dayjs('not-a-date').day()).toBeNaN()
    expect(realDayjs('not-a-date').day()).toBeNaN()
  })
})

describe('format', () => {
  const input = '2024-01-05T08:07:09'
  const CASES = [
    'YYYY-MM-DD',
    'YYYY-MM-DD HH:mm:ss',
    'YYMMDD',
    'HHmm',
    'YYYY-MM-DDTHH:mm:ss.000[Z]',
    'YYYYMMDDTHHmmss[Z]',
    'YYYY[年]M[月]D[日]'
  ]

  CASES.forEach(fmt => {
    it(`format('${fmt}') 与原版一致`, () => {
      expect(dayjs(input).format(fmt)).toBe(realDayjs(input).format(fmt))
    })
  })

  // 自研未实现 utc 插件的 Z / ZZ 偏移输出, 默认格式刻意不带 Z, 不与 dayjs 对拍
  it('format() 无参数使用默认格式, 不含时区偏移', () => {
    expect(dayjs('2024-01-15T08:07:09').format()).toBe('2024-01-15T08:07:09')
  })

  it('无效日期 format 返回 Invalid Date', () => {
    expect(dayjs('xxx').format('YYYY-MM-DD')).toBe('Invalid Date')
  })
})

describe('add / subtract', () => {
  const base = '2024-01-31T10:30:45'
  const CASES: [number, Unit][] = [
    [1, 'day'],
    [-3, 'days'],
    [2, 'week'],
    [-2, 'weeks'],
    [1, 'month'], // 1-31 + 1 月 -> 月末截断
    [-1, 'month'],
    [6, 'month'],
    [5, 'hour'],
    [-8, 'hours'],
    [30, 'minute'],
    [45, 'second'],
    [-45, 'seconds']
  ]

  CASES.forEach(([amount, unit]) => {
    it(`${amount} ${unit} 与原版一致`, () => {
      expect(dayjs(base).add(amount, unit).valueOf()).toBe(
        realDayjs(base).add(amount, unit).valueOf()
      )
      expect(dayjs(base).subtract(amount, unit).valueOf()).toBe(
        realDayjs(base).subtract(amount, unit).valueOf()
      )
    })
  })
})

describe('weekday', () => {
  // 2024-01-15 是周一
  const CASES = [0, 1, 2, 3, 4, 5, 6, 7]

  CASES.forEach(n => {
    it(`weekday(${n}) 与原版一致`, () => {
      expect(dayjs('2024-01-15').weekday(n).valueOf()).toBe(
        realDayjs('2024-01-15').weekday(n).valueOf()
      )
      expect(dayjs('2024-01-21').weekday(n).valueOf()).toBe(
        realDayjs('2024-01-21').weekday(n).valueOf()
      )
    })
  })
})

describe('utcOffset', () => {
  it('+08:00 转为 +09:00 呈现一致', () => {
    const input = '2024-01-15T23:30:00+08:00'
    const real = realDayjs(input).utcOffset(9)
    const mine = dayjs(input).utcOffset(9)
    expect(mine.format('YYYY-MM-DD HH:mm:ss')).toBe(real.format('YYYY-MM-DD HH:mm:ss'))
    expect(mine.day()).toBe(real.day())
  })

  it('本地时间转固定偏移呈现一致', () => {
    const input = '2024-01-15T12:00:00'
    expect(dayjs(input).utcOffset(9).format('YYYY-MM-DD HH:mm:ss')).toBe(
      realDayjs(input).utcOffset(9).format('YYYY-MM-DD HH:mm:ss')
    )
  })

  it('负偏移呈现一致', () => {
    const input = '2024-01-15T12:00:00'
    expect(dayjs(input).utcOffset(-5).format('YYYY-MM-DD HH:mm:ss')).toBe(
      realDayjs(input).utcOffset(-5).format('YYYY-MM-DD HH:mm:ss')
    )
  })

  it('utcOffset 后时刻不变', () => {
    const input = '2024-01-15T23:30:00+08:00'
    expect(dayjs(input).utcOffset(9).valueOf()).toBe(dayjs(input).valueOf())
  })
})

describe('isoWeek', () => {
  const CASES = [
    '2024-01-01', // 第 1 周
    '2024-01-15',
    '2024-12-30', // 归属 2025 第 1 周
    '2021-01-01', // 归属 2020 第 53 周
    '2024-02-29'
  ]

  CASES.forEach(input => {
    it(`isoWeek('${input}') 与原版一致`, () => {
      expect(dayjs(input).isoWeek()).toBe(realDayjs(input).isoWeek())
    })
  })
})

describe('isAfter', () => {
  it('按毫秒比较', () => {
    expect(dayjs('2024-01-16').isAfter(dayjs('2024-01-15'))).toBe(true)
    expect(dayjs('2024-01-14').isAfter(dayjs('2024-01-15'))).toBe(false)
  })

  it("按天粒度 isAfter(other, 'day')", () => {
    expect(dayjs('2024-01-15T23:59:59').isAfter(dayjs('2024-01-15T00:00:01'), 'day')).toBe(false)
    expect(dayjs('2024-01-16T00:00:00').isAfter(dayjs('2024-01-15T23:59:59'), 'day')).toBe(true)
    expect(dayjs('2024-01-15T00:00:00').isAfter(dayjs('2024-01-15T23:59:59'), 'day')).toBe(false)
  })
})

describe('diff', () => {
  it('毫秒差一致', () => {
    expect(dayjs('2024-01-15T12:00:00').diff(dayjs('2019-03-30'))).toBe(
      realDayjs('2024-01-15T12:00:00').diff(realDayjs('2019-03-30'))
    )
  })
})

describe('tz.guess', () => {
  it('返回 IANA 时区名', () => {
    expect(dayjs.tz.guess()).toBe(realDayjs.tz.guess())
    expect(dayjs.tz.guess()).toBe('Asia/Shanghai')
  })
})

describe('无效日期行为对齐', () => {
  it('isValid / valueOf / unix / format / day', () => {
    const real = realDayjs('invalid')
    const mine = dayjs('invalid')
    expect(mine.isValid()).toBe(real.isValid())
    expect(mine.valueOf()).toBeNaN()
    expect(Number.isNaN(mine.unix())).toBe(true)
    expect(mine.format('YYYY-MM-DD')).toBe('Invalid Date')
    expect(mine.add(1, 'day').valueOf()).toBeNaN()
  })

  it('null 输入无效, undefined 输入为当前时间', () => {
    expect(dayjs(null).isValid()).toBe(false)
    expect(realDayjs(null).isValid()).toBe(false)
    expect(dayjs(undefined).isValid()).toBe(true)
  })
})
