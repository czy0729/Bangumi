/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:55:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:55:33
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 标题 */
  hd: string

  /** 说明 */
  information?: string

  /** 开关状态 */
  value: boolean

  /** 开关同步回调 */
  onSyncPress: () => void
}>
