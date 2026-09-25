/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:25:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:14:57
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  /** 页面 store */
  $: InstanceType<typeof Store>
}>

/** 支持者信息 */
export type User = {
  /** 昵称 */
  n: string

  /** 头像相对路径 (00/71/7132), 没留过头像的没有 */
  a?: string

  /** 与 key 不一致时的 userId */
  i?: string
}

/** 支持者条目 */
export type ListItemType = {
  /** 用户 id, 同时是 USERS_MAP 的键 */
  data: string

  /** 支持额 */
  weight: number
}

/** 参与排布的节点 */
export type Node = {
  /** 用户 id */
  data: string

  /** 支持额 */
  weight: number

  /** 展示用的支持额 */
  price: number

  /** 占当前可见总额的比例 */
  percent: number
}

/** 排布后的节点, x / y 为左上角坐标 */
export type TreemapNode = {
  /** 用户 id */
  data: string

  /** 展示用的支持额 */
  price: number

  /** 占当前可见总额的比例 */
  percent: number

  /** 左偏移 */
  x: number

  /** 上偏移 */
  y: number

  /** 宽 */
  w: number

  /** 高 */
  h: number
}
