/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:39:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 15:05:33
 */
import { LIST_EMPTY } from '@constants'
import { Calendar, Home, OnAir, OnAirItem, OnAirUser } from './types'

export const NAMESPACE = 'Calendar'

export const INIT_HOME: Home = {
  anime: [],
  game: [],
  book: [],
  music: [],
  real: [],
  today: '今日上映 - 部。共 - 人收看今日番组。',
  _loaded: 0
}

export const INIT_ONAIR_ITEM: OnAirItem = {
  weekDayCN: '',
  timeCN: '',
  weekDayJP: '',
  timeJP: '',
  air: 0
}

export const INIT_USER_ONAIR_ITEM: OnAirUser = {
  weekDayCN: '',
  timeCN: ''
}

export const INIT_CALENDAR: Calendar = {
  list: [
    {
      items: [],
      weekday: { en: 'Mon', cn: '星期一', ja: '月耀日', id: 1 }
    },
    {
      items: [],
      weekday: { en: 'Tue', cn: '星期二', ja: '火耀日', id: 2 }
    },
    {
      items: [],
      weekday: { en: 'Wed', cn: '星期三', ja: '水耀日', id: 3 }
    },
    {
      items: [],
      weekday: { en: 'Thu', cn: '星期四', ja: '木耀日', id: 4 }
    },
    {
      items: [],
      weekday: { en: 'Fri', cn: '星期五', ja: '金耀日', id: 5 }
    },
    {
      items: [],
      weekday: { en: 'Sat', cn: '星期六', ja: '土耀日', id: 6 }
    },
    {
      items: [],
      weekday: { en: 'Sun', cn: '星期日', ja: '日耀日', id: 7 }
    }
  ],
  pagination: {
    page: 1,
    pageTotal: 1
  },
  _loaded: 0
}

export const STATE = {
  /** 发现页信息聚合 */
  home: INIT_HOME,

  /** @deprecated 发现页信息聚合 (CDN) */
  homeFromCDN: INIT_HOME,

  /** 每日放送 */
  calendar: LIST_EMPTY as Calendar,

  /** ekibun 的线上爬虫数据 */
  onAir: {} as OnAir,

  /** 用户自定义放送时间, onAir 读取数据时, 需要用本数据覆盖原数据 */
  onAirUser: {} as {
    [subjectId: number]: OnAirUser
  }
}

export const LOADED = {
  home: false,
  calendar: false,
  onAir: false,
  onAirUser: false
}
