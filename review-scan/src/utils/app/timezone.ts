/*
 * @Author: czy0729
 * @Date: 2023-12-23 07:58:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 09:49:55
 */
import dayjs from 'dayjs'
import { calendarEventsRequestPermissions, calendarEventsSaveEvent } from '../calendar'
import { confirm, feedback, info } from '../ui'
import { toLocal } from '../utils'
import { getSafeValue, isNull } from './utils'
import { YEAR } from './ds'

/** 云端 onAir 和自定义 onAir 组合判断 */
export function getOnAir(
  onAir: {
    [x: string]: any
  },
  onAirUser: {
    [x: string]: any
    weekDayCN?: string | number
    timeCN?: string | number
    _loaded?: any
  }
) {
  const timeJP = getSafeValue('timeJP', onAir, onAirUser)
  const timeCN = getSafeValue('timeCN', onAir, onAirUser)
  const time = isNull(timeCN) ? timeJP : timeCN

  const weekDayJP = getSafeValue('weekDayJP', onAir, onAirUser)
  const weekDayCN = getSafeValue('weekDayCN', onAir, onAirUser)
  let weekDay = isNull(weekDayCN) ? weekDayJP : weekDayCN
  const isOnair = !!(weekDay !== undefined && weekDay !== '' && (timeCN || timeJP))

  let h = typeof time === 'string' ? time.slice(0, 2) : ''
  let m = typeof time === 'string' ? time.slice(2, 4) : ''
  const isCustom = !!onAirUser?._loaded
  if (!isCustom) {
    const onAirLocal = toLocal(weekDay, `${h}${m}`)
    weekDay = onAirLocal.weekDayLocal
    h = onAirLocal.timeLocal.slice(0, 2)
    m = onAirLocal.timeLocal.slice(2, 4)
  }

  return {
    /** 星期几放送 1-7 */
    weekDay,

    /** 放送时 */
    h,

    /** 放送分 */
    m,

    /** 是否云端有数据, 存在才代表是当季番剧 */
    isOnair,

    /** 是否最终计算后有放送时间 */
    isExist: weekDay !== undefined && weekDay !== '',

    /** 是否用户自定义时间 */
    isCustom
  }
}

/** 统一逻辑, 获取放送日函数 */
export function getWeekDay(item: { weekDayCN?: any; weekDayJP?: any } = {}) {
  const weekDay = item?.weekDayCN == 0 ? item?.weekDayCN : item?.weekDayCN || item?.weekDayJP
  return weekDay === '' ? '' : weekDay
}

/** 修正和缩略 ago 时间 */
export function correctAgo(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) _time = _time.replace('ago', ' ago')
  return _time.includes('-')
    ? _time.replace(`${YEAR}-`, '')
    : _time
        .replace(/d|h|m|s/g, match => ({ d: '天', h: '时', m: '分', s: '秒' }[match]))
        .replace(' ago', '前')
        .replace(/ /g, '')
}

/** 构建日历日程标题 */
export function getCalenderEventTitle(
  item: {
    sort?: number
  } = {},
  subjectTitle: string = ''
) {
  const { sort = '' } = item
  let title = `${subjectTitle || ''}`
  if (sort) title += ` ep.${sort}`
  return title
}

/** 添加放送日程到日历 */
export function saveCalenderEvent(
  item: {
    airdate?: string
    sort?: number
    duration?: string
    url?: string
  } = {},
  subjectTitle: string = '',
  onAirCustom: {
    h?: string
    m?: string
  } = {},
  showConfirm: boolean = true
) {
  setTimeout(async () => {
    const data = await calendarEventsRequestPermissions()
    if (data !== 'authorized') {
      info('权限不足')
      return
    }

    const { airdate, duration = '', url } = item
    if (airdate) {
      try {
        const { h, m } = onAirCustom
        let date = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
        let dateEnd = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)

        if (typeof duration === 'string' && /^\d{2}:\d{2}:\d{2}$/g.test(duration)) {
          const [h, i, s] = duration.split(':')
          if (Number(h)) dateEnd = dateEnd.add(Number(h), 'hour')
          if (Number(i)) dateEnd = dateEnd.add(Number(i), 'minute')
          if (Number(s)) dateEnd = dateEnd.add(Number(s), 'second')
        }

        const title = getCalenderEventTitle(item, subjectTitle)
        const format = 'YYYY-MM-DDTHH:mm:ss.000[Z]'
        const cb = async () => {
          date = date.subtract(8, 'hours')
          dateEnd = dateEnd.subtract(8, 'hours')
          const calendarId = await calendarEventsSaveEvent(title, {
            startDate: date.format(format),
            endDate: dateEnd.format(format),
            notes: String(url).replace('http://', 'https://')
          })
          if (showConfirm) {
            setTimeout(() => {
              if (!calendarId) {
                info('添加可能失败了，请检查')
              } else {
                feedback()
                info('添加成功')
              }
            }, 240)
          }
        }

        if (showConfirm) {
          confirm(
            `${title}
            \n${date.format(format).replace('T', ' ').replace('.000Z', '')} 到\n${dateEnd
              .format(format)
              .replace('T', ' ')
              .replace('.000Z', '')}
            \n确定添加到日历中吗？`,
            cb,
            '放送提醒'
          )
        } else {
          cb()
        }
      } catch (error) {
        info('功能出错，请联系开发者')
      }
    }
  }, 80)
}

/** 导出 ics 日程格式时间 */
export function genICSCalenderEventDate(
  item: {
    airdate?: string
    sort?: number
    duration?: string
    url?: string
  } = {},
  onAirCustom: {
    h?: string
    m?: string
  } = {}
) {
  const { airdate, duration = '' } = item
  const { h, m } = onAirCustom
  let date = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
  let dateEnd = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
  if (typeof duration === 'string' && /^\d{2}:\d{2}:\d{2}$/g.test(duration)) {
    const [h, i, s] = duration.split(':')
    if (Number(h)) dateEnd = dateEnd.add(Number(h), 'hour')
    if (Number(i)) dateEnd = dateEnd.add(Number(i), 'minute')
    if (Number(s)) dateEnd = dateEnd.add(Number(s), 'second')
  }

  const format = 'YYYYMMDDTHHmmss[Z]'
  date = date.subtract(8, 'hours')
  dateEnd = dateEnd.subtract(8, 'hours')
  return {
    DTSTART: date.format(format),
    DTEND: dateEnd.format(format)
  }
}
