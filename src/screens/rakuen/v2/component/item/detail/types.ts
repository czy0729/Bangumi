/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:47:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-22 20:36:50
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'time' | 'userName' | 'userId' | 'avatar'> & {
  epoch: number
  groupCn: string
}
