/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 03:45:00
 *
 * 声优列表组件 Props
 */
import type { Props as CharacterProps } from '../types'

export type Props = Pick<CharacterProps, 'actors' | 'event'> & {
  /** InView 预加载偏移 */
  y: number
}
