/*
 * @Author: czy0729
 * @Date: 2022-07-04 15:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 03:43:04
 */
import { Crt, Ep, Staff, SubjectComments, SubjectFromHTML } from '@stores/subject/types'
import {
  Collection,
  Cover,
  DeepPartial,
  Expand,
  GetRouteParams,
  Id,
  Loaded,
  Optional,
  Override,
  Rating,
  ReadonlyResult,
  RouteSubject,
  Sites,
  SubjectId,
  SubjectTypeValue,
  WithNavigation
} from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubject>

export type SubjectSnapshot = Override<
  Omit<SubjectFromHTML, 'type' | 'watchedEps' | 'friend' | 'who' | 'formhash' | '_loaded'>,
  {
    id: SubjectId
    type: SubjectTypeValue
    name: string
    name_cn: string
    image: Cover<'c'>
    eps: Ep[]
    collection: Collection
    summary: string
    rating: Rating
    character: Crt[]
    staff: Staff[]
    titleLabel: string
    _loaded: Loaded
  }
>

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
