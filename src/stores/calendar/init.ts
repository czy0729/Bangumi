/*
 * @Author: czy0729
 * @Date: 2019-07-15 10:39:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-26 13:15:37
 */
export const NAMESPACE = 'Calendar'

export const INIT_HOME = {
  anime: [],
  game: [],
  book: [],
  music: [],
  real: [],
  today: '今日上映 - 部。共 - 人收看今日番组。'
}

export const INIT_ONAIR_ITEM = {
  /** 中国放送星期几 */
  weekDayCN: '' as string | number,

  /** 中国放送时间 */
  timeCN: '',

  /** 日本放送星期几 */
  weekDayJP: '' as string | number,

  /** 日本放送时间 */
  timeJP: '',

  /** 放送到多少集 */
  air: 0
}

export const INIT_USER_ONAIR_ITEM = {
  weekDayCN: '',
  timeCN: ''
}
