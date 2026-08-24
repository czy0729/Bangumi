/*
 * @Author: czy0729
 * @Date: 2026-08-25 02:50:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-25 02:50:55
 */
import type { WithViewStyles } from '@types'
import type { HandleBlockRef } from '../../types'

export type Props = WithViewStyles<{
  /** 区块标识 */
  title: string

  /** 收集子组件的 ref */
  onBlockRef: HandleBlockRef
}>
