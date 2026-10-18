/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 08:21:41
 *
 * 评分月刊页面的数据模型
 */
import type { ListViewInstance } from '@components'
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 收集长列表的 ref */
export type HandleForwardRef = (ref: ListViewInstance | null) => void

/** 新增表条目 */
export type ItemNew = {
  /** 条目 Id */
  id: string

  /** 条目名 */
  title: string

  /** 评分 */
  rating?: string

  /** 数值列 1 (排名) */
  value1?: string

  /** 数值列 2 */
  value2?: string
}

/** 趋势表条目 */
export type ItemTrend = {
  /** 条目 Id */
  id: string

  /** 条目名 */
  title: string

  /** 变化值 (带 +/- 符号) */
  value?: string
}

/** 单个分块 */
export type Block = {
  /** 分块标题 */
  title: string

  /** 分块条目 */
  data: (ItemNew | ItemTrend)[]
}

/** 各期数据 (下标 0 为最新一期) */
export type Data = {
  /** 期数标题 */
  title: string

  /** 期数日期区间 */
  desc: string

  /** 分块列表 */
  data: Block[]
}[]
