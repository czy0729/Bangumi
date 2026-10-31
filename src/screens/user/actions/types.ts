/*
 * @Author: czy0729
 * @Date: 2022-11-23 09:53:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页类型
 */
import type { ActionsItem, GetRouteParams, RouteActions, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RouteActions>

/** 自定义跳转项 */
export type Item = ActionsItem[number]

/** 编辑表单 (数据项 + 表单显隐) */
export type Edit = Item & {
  /** 是否展开展示编辑表单 */
  show: boolean
}

/** 表单可编辑字段 */
export type EditKey = 'name' | 'url' | 'sort'
