/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:51:09
 *
 * 页面上下文、数据模型与云快照类型
 */
import type { Tags } from '@stores/discovery/types'
import type { ResultData } from '@utils/kv/type'
import type { GetRouteParams, RouteTags, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteTags>

/** 标签条目 (discoveryStore.tags 的 list 元素) */
export type TagsItem = Tags['list'][number]

/** 标签索引云快照 (云端数据为标签列表) */
export type OtaTags = ResultData<Partial<Tags>>
