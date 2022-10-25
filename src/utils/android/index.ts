/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 17:20:26
 */
import * as Calendar from 'expo-calendar'
import { Fn } from '@types'

const CALENDAR_TITLE = 'Bangumi番组计划'

export async function saveBase64ImageToCameraRoll(
  base64Img: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  success: Fn = () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fail: Fn = () => {}
) {}

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendarrequestcalendarpermissionsasync
 */
export async function RNCalendarEventsRequestPermissions() {
  const { status } = await Calendar.requestCalendarPermissionsAsync()

  // 由于是先适配的安卓，这边接口参考安卓导出
  if (status === 'granted') return 'authorized'

  return 'undetermined' as 'denied' | 'restricted' | 'authorized' | 'undetermined'
}

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendarcreateeventasynccalendarid-eventdata
 */
export async function RNCalendarEventsSaveEvent(
  title: string,
  {
    /** 传递格式 2022-09-25 12:00:00 */
    startDate = undefined,
    endDate = undefined,
    notes = undefined
  } = {}
): Promise<string | boolean> {
  const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
  if (!Array.isArray(calendars)) return false

  const calendar = calendars.find(item => item.title === CALENDAR_TITLE)
  let calendarId: string
  if (!calendar) {
    calendarId = await createCalendar()
  } else {
    calendarId = calendar.id
  }
  if (!calendarId) return false

  return Calendar.createEventAsync(calendarId, {
    title,
    startDate,
    endDate,
    notes
  })
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync()
  return defaultCalendar.source
}

async function createCalendar() {
  const defaultCalendarSource = await getDefaultCalendarSource()
  const newCalendarID = await Calendar.createCalendarAsync({
    title: CALENDAR_TITLE,
    color: 'pink',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'bangumi app calendar',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  })
  return newCalendarID
}
