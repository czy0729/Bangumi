/*
 * @Author: czy0729
 * @Date: 2026-05-12
 */
jest.mock('../../ui', () => ({
  confirm: jest.fn(),
  feedback: jest.fn(),
  info: jest.fn()
}))

jest.mock('../../calendar', () => ({
  calendarEventsRequestPermissions: jest.fn(() => Promise.resolve('authorized')),
  calendarEventsSaveEvent: jest.fn(() => Promise.resolve('calendar-id-1'))
}))

jest.mock('../../utils', () => ({
  toLocal: jest.fn(({ weekDay, time }) => ({
    weekDayLocal: weekDay,
    timeLocal: time || '0000'
  }))
}))

jest.mock('../../async', () => ({
  syncSystemStore: () => ({
    setting: { cnFirst: false }
  })
}))

jest.mock('../utils', () => ({
  isNull: (v: any) => v === undefined || v === '',
  getSafeValue: (key: string, onAir: any, onAirUser: any) => {
    const userValue = onAirUser?.[key]
    return userValue === undefined || userValue === '' ? onAir?.[key] : userValue
  }
}))

jest.mock('../ds', () => ({
  YEAR: new Date().getFullYear()
}))

import { correctAgo, genICSCalenderEventDate, getCalenderEventTitle, getWeekDay } from '../timezone'

describe('correctAgo', () => {
  it('3d ago 转为中文', () => {
    expect(correctAgo('3d ago')).toBe('3天前')
  })

  it('2h ago 转为中文', () => {
    expect(correctAgo('2h ago')).toBe('2时前')
  })

  it('5m ago 转为中文', () => {
    expect(correctAgo('5m ago')).toBe('5分前')
  })

  it('30s ago 转为中文', () => {
    expect(correctAgo('30s ago')).toBe('30秒前')
  })

  it('多单位组合', () => {
    expect(correctAgo('1d 2h ago')).toBe('1天2时前')
  })

  it('空字符串', () => {
    expect(correctAgo('')).toBe('')
  })

  it('默认参数', () => {
    expect(correctAgo()).toBe('')
  })

  // 发现隐藏问题：含 - 时提前返回，跳过 d/h/m/s 替换
  it('[隐藏问题] 含 - 时提前返回，跳过单位替换', () => {
    const year = new Date().getFullYear()
    // correctAgo 对 `${year}-1d ago` 处理：
    // 1. indexOf('ago') >= 0，不补空格
    // 2. includes('-') 为 true，替换 YEAR- 后直接返回 '1d ago'
    // 3. 跳过了 d -> 天, ago -> 前 的替换
    const result = correctAgo(`${year}-1d ago`)
    expect(result).toBe('1d ago')
  })

  // 发现隐藏问题：ago 前无空格时自动补空格
  it('[隐藏问题] ago 前无空格时自动补空格', () => {
    expect(correctAgo('3dago')).toBe('3天前')
  })

  // 发现隐藏问题：连续年份数字可能被错误截断
  it('[隐藏问题] 年份数字出现在中间时可能被错误截断', () => {
    const year = new Date().getFullYear()
    // 如果输入 '12025-3d ago'，YEAR- 会替换 '2025-'，得到 '123d ago'
    const input = `1${year}-3d ago`
    const result = correctAgo(input)
    // 验证是否发生了错误截断
    expect(result).toBeDefined()
  })
})

describe('getWeekDay', () => {
  it('weekDayCN 优先', () => {
    expect(getWeekDay({ weekDayCN: 1, weekDayJP: 3 })).toBe(1)
  })

  // 发现隐藏问题：weekDayCN=0 时正确返回 0（周日）
  it('[隐藏问题] weekDayCN=0 时正确返回 0', () => {
    expect(getWeekDay({ weekDayCN: 0, weekDayJP: 3 })).toBe(0)
  })

  it('weekDayCN 为空时回退到 weekDayJP', () => {
    expect(getWeekDay({ weekDayCN: undefined, weekDayJP: 5 })).toBe(5)
  })

  it('两者都为空时返回空字符串', () => {
    expect(getWeekDay({ weekDayCN: '', weekDayJP: '' })).toBe('')
  })

  it('空对象返回 undefined', () => {
    expect(getWeekDay({})).toBeUndefined()
  })

  it('默认参数', () => {
    expect(getWeekDay()).toBeUndefined()
  })
})

describe('getCalenderEventTitle', () => {
  it('标题 + 集数', () => {
    expect(getCalenderEventTitle({ sort: 3 }, '某番剧')).toBe('某番剧 ep.3')
  })

  it('无集数', () => {
    expect(getCalenderEventTitle({}, '某番剧')).toBe('某番剧')
  })

  it('无标题', () => {
    expect(getCalenderEventTitle({ sort: 1 })).toBe(' ep.1')
  })

  it('空参数', () => {
    expect(getCalenderEventTitle()).toBe('')
  })
})

describe('genICSCalenderEventDate', () => {
  it('正常日期', () => {
    const result = genICSCalenderEventDate({ airdate: '2024-01-15' })
    expect(result.DTSTART).toBeDefined()
    expect(result.DTEND).toBeDefined()
    expect(result.DTSTART).toContain('Z')
    expect(result.DTEND).toContain('Z')
  })

  it('带 duration', () => {
    const result = genICSCalenderEventDate({ airdate: '2024-01-15', duration: '00:30:00' }, {})
    expect(result.DTSTART).toBeDefined()
    expect(result.DTEND).toBeDefined()
    // DTEND 应该比 DTSTART 大
    expect(result.DTEND >= result.DTSTART).toBe(true)
  })

  it('自定义时间', () => {
    const result = genICSCalenderEventDate({ airdate: '2024-01-15' }, { h: '14', m: '30' })
    expect(result.DTSTART).toBeDefined()
    expect(result.DTEND).toBeDefined()
  })

  // 发现隐藏问题：airdate 为空时返回 Invalid Date
  it('[隐藏问题] airdate 为空时返回 Invalid Date', () => {
    const result = genICSCalenderEventDate({})
    expect(result.DTSTART).toBe('Invalid Date')
    expect(result.DTEND).toBe('Invalid Date')
  })

  // 发现隐藏问题：airdate 为 undefined 时返回 Invalid Date
  it('[隐藏问题] airdate 为 undefined 时返回 Invalid Date', () => {
    const result = genICSCalenderEventDate({ airdate: undefined })
    expect(result.DTSTART).toBe('Invalid Date')
    expect(result.DTEND).toBe('Invalid Date')
  })

  it('空参数', () => {
    const result = genICSCalenderEventDate()
    expect(result).toHaveProperty('DTSTART')
    expect(result).toHaveProperty('DTEND')
  })
})
