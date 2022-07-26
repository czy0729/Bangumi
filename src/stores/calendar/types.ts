/*
 * @Author: czy0729
 * @Date: 2022-05-26 12:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 16:53:27
 */
import {
  Images,
  ListEmpty,
  Loaded,
  Rating,
  SubjectId,
  SubjectTypeValue,
  UrlSubject
} from '@types'
import { INIT_HOME, INIT_ONAIR_ITEM } from './init'

export type OnAirUser = {
  weekDayCN: string
  timeCN: string
}

export type State = {
  /** 每日放送 */
  calendar: ListEmpty<{
    items: any[]
    weekday: {
      en?: string
      cn?: string
      ja?: string
      id: number
    }
  }>

  /** 首页信息聚合 */
  home: typeof INIT_HOME

  /** @deprecated 首页信息聚合 (CDN) */
  homeFromCDN: typeof INIT_HOME

  /** ekibun 的线上爬虫数据 */
  onAir: {
    [subjectId: number]: typeof INIT_ONAIR_ITEM
  }

  /**
   * 用户自定义放送时间
   * onAir 读取数据时, 需要用本数据覆盖原数据
   */
  onAirUser: {
    [subjectId: number]: OnAirUser
  }
}

export type Calendar = {
  list: {
    items: {
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
      air: string | number
      timeCN: string
    }[]
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
