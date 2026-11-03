/*
 * @Author: czy0729
 * @Date: 2022-08-19 08:45:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 页面类型: Store 上下文、路由参数与回复表单
 */
import type { PMParams } from '@stores/user/types'
import type { GetRouteParams, RoutePM, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Params = GetRouteParams<RoutePM>

/** 回复短信提交的表单数据 */
export type ReplyParams = Pick<
  PMParams,
  'msg_title' | 'formhash' | 'msg_receivers' | 'related' | 'redirect_thread'
> & {
  /** 内容 */
  msg_body: string

  /** 提交按钮文案 */
  submit: '回复'
}
