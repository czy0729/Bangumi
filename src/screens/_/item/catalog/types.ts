/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-28 17:57:07
 */
import type { CatalogDetail } from '@stores/discovery/types'
import type { EventType, Id, Navigation } from '@types'

export type Props = {
  event?: EventType
  index?: number
  id?: Id
  name?: string

  /** 目录编纂者 (别人的才存在) */
  userName?: string
  title?: string
  info?: string
  anime?: number
  book?: number
  music?: number
  game?: number
  real?: number
  character?: number
  person?: number
  topic?: number
  blog?: number
  ep?: number

  /** 最后更新时间 */
  time?: string
  last?: string

  /** 标题高亮值 */
  filter?: string

  /** 是否自己创建的目录 */
  isUser?: boolean
  hideScore?: boolean
  children?: any

  /** 目录详情信息 */
  detail?: CatalogDetail
}

export type Context = {
  navigation?: Navigation
}
