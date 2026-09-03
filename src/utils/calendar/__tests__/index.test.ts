/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:25:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:27:33
 *
 * expo-calendar 封装层测试, mock 整个 expo-calendar 命名空间
 * 断言依赖 GMT+8 时区, 文件顶部统一设置
 */
process.env.TZ = 'Asia/Shanghai'

jest.mock('expo-calendar', () => ({
  EntityTypes: { EVENT: 'event' },
  CalendarAccessLevel: { OWNER: 'owner' },
  requestCalendarPermissionsAsync: jest.fn(),
  getCalendarsAsync: jest.fn(),
  getDefaultCalendarAsync: jest.fn(),
  createCalendarAsync: jest.fn(),
  createEventAsync: jest.fn(),
  getEventsAsync: jest.fn()
}))

// 本套件覆盖非 iOS 分支; iOS 分支见同目录 ios.test.ts
jest.mock('@constants/env', () => ({
  IOS: false,
  ANDROID: true
}))

import dayjs from 'dayjs'
import {
  calendarEventsRequestPermissions,
  calendarEventsSaveEvent,
  calendarEventsSaveGameReleaseDate,
  calendarGetEventsAsync,
  resetCalendarCacheForTest
} from '../index'
import { formatCalendarDate } from '../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Calendar: any = require('expo-calendar')

const EXISTED_CALENDAR = { id: 'cal-1', title: 'Bangumi番组计划' }

/** 模拟授权且设备上已有指定日历列表 */
function mockAuthorizedWith(calendars: any[] | null) {
  Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'granted' })
  Calendar.getCalendarsAsync.mockResolvedValue(calendars)
}

/** 模拟授权且无任何日历 */
function mockAuthorizedEmpty() {
  mockAuthorizedWith([])
  Calendar.createCalendarAsync.mockResolvedValue('cal-new-1')
}

beforeEach(() => {
  jest.resetAllMocks()
  resetCalendarCacheForTest()
})

describe('calendarEventsRequestPermissions', () => {
  it('未授权时返回 undetermined 且不查询已有日历', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'denied' })

    await expect(calendarEventsRequestPermissions()).resolves.toBe('undetermined')
    expect(Calendar.getCalendarsAsync).not.toHaveBeenCalled()
    expect(Calendar.createCalendarAsync).not.toHaveBeenCalled()
  })

  it('授权且无同名日历时创建新日历', async () => {
    mockAuthorizedEmpty()

    await expect(calendarEventsRequestPermissions()).resolves.toBe('authorized')
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(1)
    expect(Calendar.createCalendarAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Bangumi番组计划',
        color: 'pink',
        name: 'bangumi app calendar',
        ownerAccount: 'personal',
        entityType: 'event',
        accessLevel: 'owner',
        source: { isLocalAccount: true, name: 'bangumi app calendar' }
      })
    )
  })

  it('已存在同名日历时复用其 id 不重复创建', async () => {
    mockAuthorizedWith([EXISTED_CALENDAR])

    await expect(calendarEventsRequestPermissions()).resolves.toBe('authorized')
    expect(Calendar.getCalendarsAsync).toHaveBeenCalledWith('event')
    expect(Calendar.createCalendarAsync).not.toHaveBeenCalled()

    // 缓存的 id 被后续写入使用
    Calendar.createEventAsync.mockResolvedValue('evt-1')
    await calendarEventsSaveEvent('测试', {})
    expect(Calendar.createEventAsync).toHaveBeenCalledWith('cal-1', expect.anything())
  })

  it('[修复] getCalendarsAsync 返回非数组时兜底走创建流程', async () => {
    mockAuthorizedWith(null)
    Calendar.createCalendarAsync.mockResolvedValue('cal-new-1')

    await expect(calendarEventsRequestPermissions()).resolves.toBe('authorized')
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(1)

    // 创建的 id 被缓存供后续写入使用
    Calendar.createEventAsync.mockResolvedValue('evt-1')
    await calendarEventsSaveEvent('测试', {})
    expect(Calendar.createEventAsync).toHaveBeenCalledWith('cal-new-1', expect.anything())
  })

  it('[修复] 并发调用只查找/创建一次日历', async () => {
    const resolvers = []
    Calendar.requestCalendarPermissionsAsync.mockImplementation(
      () =>
        new Promise(resolve => {
          resolvers.push(resolve)
        })
    )
    Calendar.getCalendarsAsync.mockResolvedValue([])
    Calendar.createCalendarAsync.mockResolvedValue('cal-new-1')

    const p1 = calendarEventsRequestPermissions()
    const p2 = calendarEventsRequestPermissions()
    resolvers.forEach(resolve => resolve({ status: 'granted' }))

    await expect(p1).resolves.toBe('authorized')
    await expect(p2).resolves.toBe('authorized')
    expect(Calendar.getCalendarsAsync).toHaveBeenCalledTimes(1)
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(1)
  })

  it('[修复] 创建失败时请求被拒绝, 下次调用会重试', async () => {
    mockAuthorizedWith([])
    Calendar.createCalendarAsync.mockRejectedValueOnce(new Error('创建失败'))

    await expect(calendarEventsRequestPermissions()).rejects.toThrow('创建失败')

    // 失败后引用被释放, 再次调用重新走查找/创建流程
    await expect(calendarEventsRequestPermissions()).resolves.toBe('authorized')
    expect(Calendar.createCalendarAsync).toHaveBeenCalledTimes(2)
  })
})

describe('calendarEventsSaveEvent', () => {
  it('未授权时返回 false 且不写事件', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'denied' })

    await expect(calendarEventsSaveEvent('测试', {})).resolves.toBe(false)
    expect(Calendar.createEventAsync).not.toHaveBeenCalled()
  })

  it('授权后写事件并透传参数与事件 id', async () => {
    mockAuthorizedWith([EXISTED_CALENDAR])
    Calendar.createEventAsync.mockResolvedValue('evt-9')

    await expect(
      calendarEventsSaveEvent('某番剧 ep.3', {
        startDate: '2024-06-01T12:00:00.000Z',
        endDate: '2024-06-01T13:00:00.000Z',
        notes: 'https://bgm.tv/subject/123'
      })
    ).resolves.toBe('evt-9')

    expect(Calendar.createEventAsync).toHaveBeenCalledWith('cal-1', {
      title: '某番剧 ep.3',
      startDate: '2024-06-01T12:00:00.000Z',
      endDate: '2024-06-01T13:00:00.000Z',
      notes: 'https://bgm.tv/subject/123'
    })
  })

  it('[修复] 写入失败时捕获错误返回空串并清空缓存', async () => {
    mockAuthorizedWith([EXISTED_CALENDAR])
    Calendar.createEventAsync.mockRejectedValueOnce(new Error('日历已被删除'))

    // 原实现 return 未 await 的 Promise 导致异常逃出 catch, 现应被捕获
    await expect(calendarEventsSaveEvent('测试', {})).resolves.toBe('')

    // 缓存被清空, 下次调用重新查询日历并可成功写入
    Calendar.createEventAsync.mockResolvedValueOnce('evt-2')
    await expect(calendarEventsSaveEvent('测试', {})).resolves.toBe('evt-2')
    expect(Calendar.getCalendarsAsync).toHaveBeenCalledTimes(2)
  })
})

describe('calendarGetEventsAsync', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-06-01T12:00:00+08:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('未获取到日历 id 时返回空数组', async () => {
    await expect(calendarGetEventsAsync()).resolves.toEqual([])
    expect(Calendar.getEventsAsync).not.toHaveBeenCalled()
  })

  it('查询窗口为最近至未来 6 个月并返回标题列表', async () => {
    mockAuthorizedWith([EXISTED_CALENDAR])
    await calendarEventsRequestPermissions()

    Calendar.getEventsAsync.mockResolvedValue([{ title: 'A ep.1' }, { title: 'B' }])

    await expect(calendarGetEventsAsync()).resolves.toEqual(['A ep.1', 'B'])

    const [calendarIds, start, end] = Calendar.getEventsAsync.mock.calls[0]
    expect(calendarIds).toEqual(['cal-1'])
    expect(start.toISOString()).toBe(formatCalendarDate(dayjs('2024-06-01T12:00:00')))
    expect(end.toISOString()).toBe(formatCalendarDate(dayjs('2024-06-01T12:00:00').add(6, 'month')))
  })
})

describe('calendarEventsSaveGameReleaseDate', () => {
  beforeEach(() => {
    mockAuthorizedWith([EXISTED_CALENDAR])
    Calendar.createEventAsync.mockResolvedValue('evt-1')
  })

  it('中文日期写入全天日程并带地区后缀', async () => {
    await expect(
      calendarEventsSaveGameReleaseDate(
        '某游戏',
        '1998年11月21日',
        'JP',
        'https://bgm.tv/subject/1'
      )
    ).resolves.toBe('evt-1')

    expect(Calendar.createEventAsync).toHaveBeenCalledWith('cal-1', {
      title: '某游戏 (JP)',
      startDate: '1998-11-20T16:00:00.000Z',
      endDate: '1998-11-21T15:59:59.000Z',
      notes: 'https://bgm.tv/subject/1'
    })
  })

  it('标准日期剥离平台后缀后写入', async () => {
    await calendarEventsSaveGameReleaseDate('某游戏', '2004-04-28(PC)', '')

    expect(Calendar.createEventAsync).toHaveBeenCalledWith(
      'cal-1',
      expect.objectContaining({
        title: '某游戏',
        startDate: '2004-04-27T16:00:00.000Z'
      })
    )
  })

  it('[修复] 无法解析日期时返回 false 且不触发任何日历操作', async () => {
    for (const date of ['', 'TBD', '(PC)', '2026-13-40']) {
      await expect(calendarEventsSaveGameReleaseDate('某游戏', date, 'JP')).resolves.toBe(false)
    }

    expect(Calendar.requestCalendarPermissionsAsync).not.toHaveBeenCalled()
    expect(Calendar.createEventAsync).not.toHaveBeenCalled()
  })
})
