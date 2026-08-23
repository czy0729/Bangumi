/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:26:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-24 00:26:11
 *
 * iOS 分支测试: 单独文件以便用工厂 mock 覆盖 @constants/constants 的 IOS 标识
 */
process.env.TZ = 'Asia/Shanghai'

jest.mock('@constants/constants', () => ({
  IOS: true
}))

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

import { calendarEventsRequestPermissions } from '../index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Calendar: any = require('expo-calendar')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('calendarEventsRequestPermissions (iOS)', () => {
  it('使用系统默认日历的 source 创建应用日历', async () => {
    Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: 'granted' })
    Calendar.getCalendarsAsync.mockResolvedValue([])
    const source = { id: 'src-1', name: 'iCloud', type: 'com.apple.calendar' }
    Calendar.getDefaultCalendarAsync.mockResolvedValue({ source })
    Calendar.createCalendarAsync.mockResolvedValue('cal-ios')

    await expect(calendarEventsRequestPermissions()).resolves.toBe('authorized')
    expect(Calendar.getDefaultCalendarAsync).toHaveBeenCalledTimes(1)
    expect(Calendar.createCalendarAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Bangumi番组计划',
        sourceId: 'src-1',
        source
      })
    )
  })
})
