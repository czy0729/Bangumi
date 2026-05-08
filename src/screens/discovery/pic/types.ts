/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-07 22:57:27
 */
import type { GetRouteParams, Id, ListArray, RoutePic, WithNavigation } from '@types'
import type Store from './store'

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

export type List = ListArray<ItemInfo>

export type Srcs = Record<Id, string>

export type HandleListProgress = (data: List, progress?: string) => any
export type HandleSrcsProgress = (data: Srcs, progress?: string) => any
