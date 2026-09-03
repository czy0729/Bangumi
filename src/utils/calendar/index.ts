/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:27:29
 */
import dayjs from 'dayjs'
import * as Calendar from 'expo-calendar'
import { IOS } from '@constants/env'
import { formatCalendarDate, parseReleaseDate } from './utils'
import { CALENDAR_NAME, CALENDAR_TITLE } from './ds'

/** 缓存的应用日历 id */
let lastCalendarId = ''

/** 进行中的查找/创建日历请求, 用于并发调用去重 */
let pendingEnsureCalendarId: Promise<string> | null

/**
 * https://docs.expo.dev/versions/latest/sdk/calendar/#calendarrequestcalendarpermissionsasync
 */
export async function calendarEventsRequestPermissions(): Promise<
  'denied' | 'restricted' | 'authorized' | 'undetermined'
> {
  const { status } = await Calendar.requestCalendarPermissionsAsync()

  // 由于是先适配的安卓，这边接口参考安卓导出
  if (status !== 'granted') return 'undetermined'

  // 授权后确保应用日历存在, 并发调用共享同一次查找/创建流程
  await ensureCalendarId()
  return 'authorized'
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
  }: {
    startDate?: string
    endDate?: string
    notes?: string
  } = {}
): Promise<string | boolean> {
  const status = await calendarEventsRequestPermissions()
  if (status !== 'authorized' || !lastCalendarId) return false

  try {
    return await Calendar.createEventAsync(lastCalendarId, {
      title,
      startDate,
      endDate,
      notes
    })
  } catch (error) {
    // 日历可能已被用户在系统端删除, 清空缓存以便下次重新查找/创建
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
    new Date(formatCalendarDate(dayjs())),
    new Date(formatCalendarDate(dayjs().add(6, 'month')))
  )
  return events.map(item => item.title)
}

/** 保存游戏发售日期到日历 */
export async function calendarEventsSaveGameReleaseDate(
  title: string,
  date: string,
  region: string,
  notes?: string
): Promise<string | boolean> {
  const parsed = parseReleaseDate(date)

  // 无法解析出发售日期时不写入日历
  if (!parsed) return false

  const eventTitle = region ? `${title} (${region})` : title

  // 全天事件: 当天 00:00 ~ 23:59
  return calendarEventsSaveEvent(eventTitle, {
    startDate: formatCalendarDate(dayjs(`${parsed}T00:00:00`)),
    endDate: formatCalendarDate(dayjs(`${parsed}T23:59:59`)),
    notes
  })
}

/** 测试用: 重置模块内部缓存的日历 id 与并发请求状态 */
export function resetCalendarCacheForTest() {
  lastCalendarId = ''
  pendingEnsureCalendarId = null
}

async function ensureCalendarId(): Promise<string> {
  if (lastCalendarId) return lastCalendarId
  if (pendingEnsureCalendarId) return pendingEnsureCalendarId

  const task = (async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
    // 接口异常返回非数组时视作无同名日历, 走创建流程兜底
    const existed = Array.isArray(calendars)
      ? calendars.find(item => item.title === CALENDAR_TITLE)
      : undefined
    lastCalendarId = existed ? existed.id : await createCalendar()
    return lastCalendarId
  })()
  pendingEnsureCalendarId = task

  // 结束后释放引用: 成功时后续调用走 lastCalendarId 短路, 失败时允许下次重试
  const onSettled = () => {
    if (pendingEnsureCalendarId === task) pendingEnsureCalendarId = null
  }
  task.then(onSettled, onSettled)

  return task
}

async function getDefaultCalendarSource(): Promise<Calendar.Source> {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync()
  return defaultCalendar.source
}

async function createCalendar(): Promise<string> {
  // 安卓本地账户来源无 type 字段, 与 expo 类型定义不完全一致
  const source: Calendar.Source = IOS
    ? await getDefaultCalendarSource()
    : ({ isLocalAccount: true, name: CALENDAR_NAME } as Calendar.Source)

  return Calendar.createCalendarAsync({
    title: CALENDAR_TITLE,
    color: 'pink',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: source.id,
    source,
    name: CALENDAR_NAME,
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  })
}
