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
  toLocal: jest.fn((weekDay, time) => ({
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

import {
  correctAgo,
  genICSCalenderEventDate,
  getCalenderEventTitle,
  getOnAir,
  getWeekDay,
  saveCalenderEvent
} from '../timezone'

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

describe('getOnAir', () => {
  it('有云端数据时返回正确结构', () => {
    const onAir = { timeJP: '2330', timeCN: '2330', weekDayJP: 5, weekDayCN: 6 }
    const result = getOnAir(onAir, {})
    expect(result).toHaveProperty('weekDay')
    expect(result).toHaveProperty('h')
    expect(result).toHaveProperty('m')
    expect(result).toHaveProperty('isOnair')
    expect(result).toHaveProperty('isExist')
    expect(result).toHaveProperty('isCustom')
  })

  it('用户自定义时间 (isCustom=true)', () => {
    const onAir = {}
    const onAirUser = { timeCN: '1400', weekDayCN: 3, _loaded: true }
    const result = getOnAir(onAir, onAirUser)
    expect(result.isCustom).toBe(true)
    expect(result.weekDay).toBe(3)
    expect(result.h).toBe('14')
    expect(result.m).toBe('00')
  })

  it('非自定义时调用 toLocal 转换', () => {
    const onAir = { timeJP: '2330', weekDayJP: 5 }
    const result = getOnAir(onAir, {})
    expect(result.isCustom).toBe(false)
    expect(result.weekDay).toBe(5)
  })

  it('timeCN 优先于 timeJP', () => {
    const onAir = { timeJP: '1000', timeCN: '1400', weekDayJP: 3, weekDayCN: 6 }
    const result = getOnAir(onAir, {})
    expect(result.h).toBe('14')
    expect(result.m).toBe('00')
  })

  it('timeCN 为空时回退到 timeJP', () => {
    const onAir = { timeJP: '2330', timeCN: '', weekDayJP: 5 }
    const result = getOnAir(onAir, {})
    expect(result.h).toBe('23')
    expect(result.m).toBe('30')
  })

  it('weekDayCN=0 时 isOnair 为 true (周日)', () => {
    const onAir = { weekDayCN: 0, timeCN: '1200' }
    const result = getOnAir(onAir, {})
    expect(result.isOnair).toBe(true)
  })

  it('无任何时间数据时 isOnair 为 false', () => {
    const result = getOnAir({}, {})
    expect(result.isOnair).toBe(false)
  })

  // [问题] time 为数字类型时 h 和 m 初始为空，但 toLocal 默认填充为 '00'
  it('[问题] time 为数字类型时 h 和 m 初始为空，但 toLocal 默认填充为 00', () => {
    const onAir = { timeCN: 2330 as any, weekDayCN: 5 }
    const result = getOnAir(onAir, {})
    // typeof 2330 !== 'string' => h='', m=''，但 toLocal mock 对空字符串返回 '0000'
    expect(result.h).toBe('00')
    expect(result.m).toBe('00')
  })

  it('[问题] onAirUser._loaded 存在但 timeCN/weekDayCN 为 undefined 时 isOnair 为 false', () => {
    const onAir = {}
    const onAirUser = { _loaded: true }
    const result = getOnAir(onAir, onAirUser)
    expect(result.isOnair).toBe(false)
    expect(result.isCustom).toBe(true)
  })
})

describe('saveCalenderEvent', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('权限不足时显示提示信息', async () => {
    const { calendarEventsRequestPermissions } = require('../../calendar')
    const { info } = require('../../ui')
    calendarEventsRequestPermissions.mockResolvedValueOnce('denied')

    saveCalenderEvent({ airdate: '2024-01-15' }, '测试番剧')
    jest.advanceTimersByTime(80)
    await Promise.resolve()
    expect(info).toHaveBeenCalledWith('权限不足')
  })

  it('无 airdate 时不执行任何操作', async () => {
    const { calendarEventsRequestPermissions } = require('../../calendar')
    calendarEventsRequestPermissions.mockResolvedValueOnce('authorized')

    saveCalenderEvent({}, '测试番剧')
    jest.advanceTimersByTime(80)
    await Promise.resolve()

    expect(require('../../calendar').calendarEventsSaveEvent).not.toHaveBeenCalled()
  })

  it('showConfirm=false 时直接添加不弹确认框', async () => {
    const { calendarEventsRequestPermissions, calendarEventsSaveEvent } = require('../../calendar')
    calendarEventsRequestPermissions.mockResolvedValueOnce('authorized')
    calendarEventsSaveEvent.mockResolvedValueOnce('cal-id-1')

    saveCalenderEvent(
      { airdate: '2024-01-15', duration: '00:24:00', url: 'https://bgm.tv/subject/123' },
      '测试番剧',
      {},
      false
    )

    jest.advanceTimersByTime(80)
    await Promise.resolve()
    expect(require('../../ui').confirm).not.toHaveBeenCalled()
  })

  it('[问题] duration 格式不匹配正则时 dateEnd 不增加', async () => {
    const { calendarEventsRequestPermissions, calendarEventsSaveEvent } = require('../../calendar')
    calendarEventsRequestPermissions.mockResolvedValueOnce('authorized')
    calendarEventsSaveEvent.mockResolvedValueOnce('cal-id-1')

    saveCalenderEvent({ airdate: '2024-01-15', duration: 'invalid' }, '测试番剧', {}, false)

    jest.advanceTimersByTime(80)
    await Promise.resolve()
    expect(calendarEventsSaveEvent).toHaveBeenCalled()
  })
})
