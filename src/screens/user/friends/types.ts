/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 11:17:00
 */
import type { Friend } from '@stores/users/types'
import type { GetRouteParams, RouteFriends, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteFriends>

/** list item 类型：分组头 or 好友 */
export type ListItem =
  | { type: 'header'; key: string; title: string }
  | { type: 'friend'; key: string; item: Friend }
