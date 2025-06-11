/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-10 06:28:42
 */
import { GetRouteParams, RoutePic, WithNavigation } from '@types'
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
