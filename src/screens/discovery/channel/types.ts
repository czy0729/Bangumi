/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 页面上下文与云快照类型
 */
import type { Channel } from '@stores/discovery/types'
import type { ResultData } from '@utils/kv/type'
import type { GetRouteParams, RouteChannel, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteChannel>

/** 频道云快照 (云端数据省略 friends) */
export type OtaChannel = ResultData<Partial<Channel>>
