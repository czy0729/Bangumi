/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:05:49
 */
import * as Calendar from 'expo-calendar'
import dayjs from 'dayjs'
import { IOS } from '@constants/constants'

const CALENDAR_TITLE = 'Bangumi番组计划'

const CALENDAR_NAME = 'bangumi app calendar'

let lastCalendarId: string

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendarrequestcalendarpermissionsasync
 */
export async function calendarEventsRequestPermissions() {
  const { status } = await Calendar.requestCalendarPermissionsAsync()

  // 由于是先适配的安卓，这边接口参考安卓导出
  if (status === 'granted') {
    // 随便检查有没有创建过日历
    if (!lastCalendarId) {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
      if (Array.isArray(calendars)) {
        const calendar = calendars.find(item => item.title === CALENDAR_TITLE)
        if (!calendar) {
          lastCalendarId = await createCalendar()
        } else {
          lastCalendarId = calendar.id
        }
      }
    }
    return 'authorized'
  }

  return 'undetermined' as 'denied' | 'restricted' | 'authorized' | 'undetermined'
}

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendarcreateeventasynccalendarid-eventdata
 */
export async function calendarEventsSaveEvent(
  title: string,
  {
    /** 传递格式 2022-09-25 12:00:00 */
    startDate = undefined,
    endDate = undefined,
    notes = undefined
  } = {}
): Promise<string | boolean> {
  const status = await calendarEventsRequestPermissions()
  if (status !== 'authorized' || !lastCalendarId) return false

  try {
    return Calendar.createEventAsync(lastCalendarId, {
      title,
      startDate,
      endDate,
      notes
    })
  } catch (error) {
    lastCalendarId = ''
    return ''
  }
}

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendargeteventsasynccalendarids-startdate-enddate
 */
export async function calendarGetEventsAsync(): Promise<string[]> {
  if (!lastCalendarId) return []

  const events = await Calendar.getEventsAsync(
    [lastCalendarId],
    new Date(dayjs().subtract(8, 'hours').format('YYYY-MM-DDTHH:mm:ss.000[Z]')),
    new Date(
      dayjs().subtract(8, 'hours').add(6, 'month').format('YYYY-MM-DDTHH:mm:ss.000[Z]')
    )
  )
  return events.map(item => item.title)
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync()
  return defaultCalendar.source
}

async function createCalendar() {
  const defaultCalendarSource = IOS
    ? await getDefaultCalendarSource()
    : { isLocalAccount: true, name: CALENDAR_NAME }
  const newCalendarID = await Calendar.createCalendarAsync({
    title: CALENDAR_TITLE,
    color: 'pink',
    entityType: Calendar.EntityTypes.EVENT,
    // @ts-expect-error
    sourceId: defaultCalendarSource.id,
    // @ts-expect-error
    source: defaultCalendarSource,
    name: CALENDAR_NAME,
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  })
  return newCalendarID
}
