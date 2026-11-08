/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:55:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * 页面数据结构
 */
import type { Loaded, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Stats = {
  a: number[]
  _loaded: Loaded
}

/** 错误报告条目 */
export type LogItem = {
  /** sessionId */
  i: string

  /** 系统 */
  o: string

  /** 页面地址 */
  u: string

  /** 来源页面 */
  r: string

  /** 上报时间 */
  d: string
}
