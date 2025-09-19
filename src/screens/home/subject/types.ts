import { View } from 'react-native'
/*
 * @Author: czy0729
 * @Date: 2022-07-04 15:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-20 06:11:35
 */
import { ImageProps } from '@components'
import { Ep, Staff, SubjectComments, SubjectFromHTML } from '@stores/subject/types'
import {
  Collection,
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

/** 收集子组件的 ref */
export type HandleBlockRef = (ref: View, componentName: string) => void

export type Crt = {
  id: Id

  /** 角色封面小图 (g) */
  image: ImageProps['src']

  /** 角色封面中图 (m) */
  _image: ImageProps['src']
  name: string
  nameJP: string
  desc: string
  roleName: string
  actorId: Id
}

export type SubjectSnapshot = Override<
  Omit<SubjectFromHTML, 'type' | 'watchedEps' | 'friend' | 'who' | 'formhash' | '_loaded'>,
  {
    id: SubjectId
    type: SubjectTypeValue
    name: string
    name_cn: string
    image: string
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
  Record<
    Sites,
    {
      [ep: string]: string
    }
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
