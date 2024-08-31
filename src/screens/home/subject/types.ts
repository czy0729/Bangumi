/*
 * @Author: czy0729
 * @Date: 2022-07-04 15:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 03:43:04
 */
import { SubjectComments } from '@stores/subject/types'
import { factory } from '@utils'
import {
  DeepPartial,
  Expand,
  GetRouteParams,
  Id,
  Loaded,
  Navigation,
  Optional,
  ReadonlyResult,
  RouteSubject,
  Sites,
  SubjectId
} from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = GetRouteParams<RouteSubject>

export type SubjectCommentValue = ReadonlyResult<Optional<SubjectComments, 'version'>>

export type EpsData = Expand<
  DeepPartial<
    Record<
      Sites,
      {
        [ep: string]: string
      }
    >
  > & {
    _loaded: Loaded
  }
>

export type AnitabiData = {
  id: SubjectId
  city: string
  title: string
  cn: string
  color: string
  cover: `https://image.anitabi.cn/points/${number}/${string}.jpg?plan=h160`
  geo: [number, number]
  imagesLength: number
  modified: number
  pointsLength: number
  zoom: number
  litePoints: {
    cn: string
    ep: number
    geo: [number, number]
    id: string
    image: `https://image.anitabi.cn/points/${number}/${string}.jpg?plan=h160`
    name: string

    /** 代表 ep 中的秒 */
    s: number
  }[]
  _loaded?: Loaded
}

export type EpsItem = Partial<{
  url: any
  id: Id
  sort: number
  name: any
  name_cn: any
  duration: any
  airdate: any
  desc: any
  type: number
}>
