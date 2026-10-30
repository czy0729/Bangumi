/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:47:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目元信息属性
 */
import type { Props as ParentProps } from '../types'

export type Props = Pick<ParentProps, 'time' | 'userName' | 'userId' | 'avatar'> & {
  epoch: number
  groupCn: string
}
