/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-10 06:28:42
 */
import { GetRouteParams, Id, RoutePic, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePic>

export type ItemInfo = {
  href: string
  id: string
  title: string
  cate: string
  num: string
  tags: string
  aspectRatio: number
}

export type List = ItemInfo[]

export type Srcs = Record<Id, string>

export type HandleListProgress = (data: List) => any

export type HandleSrcsProgress = (data: Srcs) => any
