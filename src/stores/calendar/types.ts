/*
 * @Author: czy0729
 * @Date: 2022-05-26 12:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 16:17:01
 */
import {
  Cover,
  Images,
  Loaded,
  Override,
  Rating,
  SubjectId,
  SubjectType,
  SubjectTypeValue,
  UrlSubject
} from '@types'

export type Home = Override<
  Record<
    SubjectType,
    {
      cover: Cover<'l'>
      title: string
      subjectId: SubjectId
      info: string
    }[]
  >,
  {
    today: string
    _loaded: Loaded
  }
>

export type CalendarItem = {
  /** 以下为每日放送 api 基本属性 */
  id: SubjectId
  url: UrlSubject
  type: SubjectTypeValue
  name: string
  name_cn: string
  summary: string
  air_date: string
  air_weekday: string | number
  rating: Rating
  rank: string | number
  images: Images
  collection: {
    doing: string | number
  }

  /** 以下为扩展属性 */
  air?: string | number
  weekDayLocal?: string | number
  timeLocal?: string
  weekDayCN?: string | number
  timeCN?: string
  weekDayJP?: string | number
  timeJP?: string
}

export type Calendar = {
  list: {
    items: CalendarItem[]
    weekday: {
      en: string
      cn: string
      ja: string
      id: number
    }
  }[]
  pagination: {
    page: number
    pageTotal: number
  }
  _loaded: Loaded
}

export type OnAirItem = {
  /** 中国放送星期几 */
  weekDayCN: string | number

  /** 中国放送时间 */
  timeCN: string

  /** 日本放送星期几 */
  weekDayJP: string | number

  /** 日本放送时间 */
  timeJP: string

  weekDayLocal?: string | number

  timeLocal?: string

  /** 放送到多少集 */
  air?: number

  /** 标记是否被用户自定义放送时间覆盖 */
  custom?: boolean
}

export type OnAir = Override<
  {
    [subjectId: SubjectId]: OnAirItem
  },
  {
    _loaded: Loaded
  }
>

export type OnAirUser = {
  weekDayCN: string | number
  timeCN: string
  _loaded?: Loaded
}
