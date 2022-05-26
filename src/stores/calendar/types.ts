/*
 * @Author: czy0729
 * @Date: 2022-05-26 12:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-26 13:05:47
 */
import { ListEmpty } from '@types'
import { INIT_HOME, INIT_ONAIR_ITEM, INIT_USER_ONAIR_ITEM } from './init'

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

  /** ekibun的线上爬虫数据 */
  onAir: {
    [subjectId: number]: typeof INIT_ONAIR_ITEM
  }

  /**
   * 用户自定义放送时间
   * onAir读取数据时, 需要用本数据覆盖原数据
   */
  onAirUser: {
    [subjectId: number]: typeof INIT_USER_ONAIR_ITEM
  }
}
