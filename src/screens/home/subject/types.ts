/*
 * @Author: czy0729
 * @Date: 2022-07-04 15:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 20:40:04
 */
import type { View } from 'react-native'
import type { ImageProps, ListViewScrollMethods } from '@components'
import type {
  Crt as SourceCrt,
  Ep,
  Staff as SourceStaff,
  SubjectComments,
  SubjectFromHTML
} from '@stores/subject/types'
import type {
  Collection,
  DeepReadonly,
  Expand,
  GetRouteParams,
  Id,
  ImageSource,
  Loaded,
  Optional,
  Override,
  Rating,
  RouteSubject,
  Sites,
  SubjectId,
  SubjectTypeValue,
  WithNavigation
} from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteSubject>

/** 收集长列表的 ref */
export type HandleForwardRef = (ref: ListViewScrollMethods) => void

/** 收集子组件的 ref */
export type HandleBlockRef = (ref: View, componentName: string) => void

/** 子组件可以调用此方法定位到指定 y 轴坐标 */
export type HandleScrollIntoViewIfNeeded = (y: number) => void

/** 子组件可以调用此方法定位到指定子组件块 */
export type HandleScrollTo = (component: string) => void

/** 滚动到顶 */
export type HandleScrollToTop = () => void

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

export type Staff = {
  id: Id
  image: ImageSource | string | number
  _image: ImageSource | string | number
  name: string
  nameJP: string
  desc: string
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

export type SubjectCommentValue = Optional<SubjectComments, 'version'>

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

export type RecDataItem = {
  id: SubjectId
  name: string
  image: string
  reason?: string
}

export type RecData = {
  data: RecDataItem[]
  _loaded: Loaded
}

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
  url: string
  id: Id
  sort: number
  name: string
  name_cn: string
  duration: string
  airdate: string
  desc: string
  type: number
}>

export type TagsItem = string | { pressable: boolean; value: string }

export type VideoItem = {
  cover: string
  href: string
  src: string
  result_type: string
  title: string
}

/** mapCrt 入参 */
export type CrtMapSource = DeepReadonly<SourceCrt[]>

/** mapStaff 入参 */
export type StaffMapSource = DeepReadonly<SourceStaff[]>

/** mapPersons 入参 (网页抓取的人员数据) */
export type PersonsMapSource = readonly {
  id: string
  cover?: string
  nameCn?: string
  name?: string
  position?: string
}[]
