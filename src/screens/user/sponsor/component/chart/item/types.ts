/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 色块与色块内头像 Props
 */
import type { ViewStyle } from '@types'
import type { TreemapNode } from '../../../types'

export type Props = Pick<TreemapNode, 'data' | 'percent' | 'price' | 'x' | 'y' | 'w' | 'h'> & {
  /** 是否为自己, 用自己的底色覆盖档位色阶 */
  isMine: boolean

  /** 点击隐藏该格 */
  onPress: (id: string) => void

  /** 长按进入空间, 仅支持者可用 */
  onLongPress?: (id: string) => void
}

export type AvatarProps = {
  /** 用户 id */
  data: string

  /** 头像边长 */
  size: number

  /** 头像下间距 */
  marginBottom: number

  /** 档位底色 */
  style?: ViewStyle
}
