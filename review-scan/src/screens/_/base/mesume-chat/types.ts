/*
 * @Author: czy0729
 * @Date: 2025-02-05 05:19:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-14 09:28:42
 */
import { Fn, Loaded } from '@types'

export type Props = {
  /** 是否显示锐评框 */
  show: boolean

  /** 当前锐评文本 */
  value: string

  /** 文本生成的时间戳 */
  time?: Loaded

  /** 未有文本前的占位 */
  placeholder?: string

  /** 锐评请求中 */
  loading?: boolean

  /** 重新请求 */
  onRefresh: Fn

  /** 前一个锐评 */
  onBefore: Fn

  /** 后一个锐评 */
  onNext: Fn

  /** 关闭锐评框 */
  onClose: Fn
}
