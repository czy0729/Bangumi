/*
 * @Author: czy0729
 * @Date: 2026-08-27 05:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 05:20:32
 */
import type { LikesPassProps } from '../types'

export type Props = LikesPassProps & {
  /** 翻转高度 */
  height: number
  children: React.ReactElement
}
