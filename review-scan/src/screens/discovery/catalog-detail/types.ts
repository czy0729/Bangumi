/*
 * @Author: czy0729
 * @Date: 2022-08-26 14:15:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 03:58:40
 */
import { CatalogDetail } from '@stores/discovery/types'
import { GetRouteParams, InferArray, Override, RouteCatalogDetail, WithNavigation } from '@types'
import Store from './store'
import { COLLECT_DS, LAYOUT_DS, SORT_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteCatalogDetail>

export type Layout = (typeof LAYOUT_DS)[number]['key']

export type Sort = (typeof SORT_DS)[number]['key']

export type Collect = (typeof COLLECT_DS)[number]['key']

export type ListItem = Override<
  InferArray<CatalogDetail['list']>,
  {
    score?: number | string
    rank?: number | string
    total?: number | string
  }
>

export type List = ListItem[]
