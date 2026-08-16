/*
 * @Author: czy0729
 * @Date: 2025-02-05 05:19:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import type { Loaded } from '@types'
import type { MUSUME_CONFIG } from './ds'

/** Bangumi 娘人格 key */
export type MusumeKey = keyof typeof MUSUME_CONFIG

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
  onRefresh: () => void

  /** 前一个锐评 */
  onBefore: () => void

  /** 后一个锐评 */
  onNext: () => void

  /** 关闭锐评框 */
  onClose: () => void
}
