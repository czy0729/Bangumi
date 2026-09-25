/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 19:06:32
 */
import type { ViewStyle } from '@types'

export type Props = {
  /** 用户 id */
  data: string

  /** 占当前可见总额的比例 */
  percent: number

  /** 支持额 */
  price: number

  /** 左偏移 */
  x: number

  /** 上偏移 */
  y: number

  /** 宽 */
  w: number

  /** 高 */
  h: number

  /** 点击隐藏该格 */
  onPress: (id: string) => void

  /** 长按进入空间, 仅支持者可用 */
  onLongPress?: (id: string) => void

  /** 主题标记, 用于打破 memo 让色阶随主题更新 */
  isDark: boolean

  /** 是否为自己, 用自己的底色覆盖档位色阶 */
  isMine: boolean
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
