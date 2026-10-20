/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:42:41
 *
 * 条目封面一览页面类型
 */
import type { GetRouteParams, RouteOverview, SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteOverview>

/** 封面一览条目 */
export type ListItem = {
  /** 条目 Id */
  id: SubjectId

  /** 封面地址 */
  image: string

  /** 条目名 */
  name: string

  /** 类型描述 */
  desc?: string
}
