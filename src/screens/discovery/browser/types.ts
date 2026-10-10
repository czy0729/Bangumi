/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:30:00
 *
 * 页面上下文与筛选参数类型
 */
import type { Browser } from '@stores/tag/types'
import type { WithNavigation } from '@types'
import type { ResultData } from '@utils/kv/type'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 索引年, 初始为当前年 (number), 下拉选择后为字符串, 空字符串为不筛选 */
export type Airtime = string | number

/** 索引月, 初始为当前月 (number), 下拉选择后为字符串, 空字符串或非数字为不筛选 */
export type Month = string | number

/** 云快照 key */
export type SnapshotId = `browser_${string}`

/** 云快照数据 (完整索引结构 + 上传时间戳) */
export type OtaSnapshot = ResultData<Browser>
