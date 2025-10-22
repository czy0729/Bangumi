/*
 * @Author: czy0729
 * @Date: 2022-08-26 14:15:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:27:56
 */
import type { CatalogDetailItem } from '@stores/discovery/types'
import type {
  GetRouteParams,
  Override,
  RouteCatalogDetail,
  ScrollEvent,
  WithNavigation
} from '@types'
import type Store from './store'
import type { COLLECT_DS, LAYOUT_DS, SORT_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCatalogDetail>

export type Layout = (typeof LAYOUT_DS)[number]['key']

export type Sort = (typeof SORT_DS)[number]['key']

export type Collect = (typeof COLLECT_DS)[number]['key']

export type ListItem = Override<
  CatalogDetailItem,
  {
    score?: number | string
    rank?: number | string
    total?: number | string
  }
>

export type List = ListItem[]

export type HandleScroll = (evt: ScrollEvent) => void
