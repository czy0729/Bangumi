/*
 * @Author: czy0729
 * @Date: 2026-09-04 03:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 03:45:00
 */
import type { Props as ActorsProps } from '../types'
import type { Actors } from '../../types'

export type Props = Pick<ActorsProps, 'event' | 'y'> & {
  /** 声优数据 */
  item: Actors[0]

  /** 是否只有一个声优, 加宽展示 */
  single: boolean
}
