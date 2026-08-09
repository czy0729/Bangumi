/*
 * @Author: czy0729
 * @Date: 2026-08-09 06:05:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 06:05:21
 */
import type { SharedValue } from 'react-native-reanimated'
import type {
  HapticFeedbackStyle,
  MenuAnchorPosition,
  MenuItemProps,
  MenuOpenParams
} from '../types'

/** useItemAnimation 选项 */
export type ItemAnimationProps = {
  /** 菜单项 */
  items: MenuItemProps[]

  /** 激活方式 */
  activateOn?: 'tap' | 'double-tap' | 'hold'

  /** 触发反馈 */
  hapticStyle?: HapticFeedbackStyle

  /** 点击已打开的菜单项时是否关闭 */
  closeOnTap?: boolean

  /** 是否从底部展开 */
  bottom?: boolean

  /** 菜单锚点位置 */
  menuAnchorPosition?: MenuAnchorPosition

  /** 菜单项点击参数映射 */
  actionParams?: { [name: string]: unknown[] }

  /** 是否禁止菜单位移 */
  disableMove?: boolean

  /** 打开菜单回调 */
  open: (params: MenuOpenParams) => void
}

/** useItemGesture 选项 */
export type ItemGestureProps = {
  /** 激活方式 */
  activateOn?: 'tap' | 'double-tap' | 'hold'

  /** 是否展开动画中 */
  isAnimating: SharedValue<boolean>

  /** 点击已打开的菜单项时是否关闭 */
  closeOnTap?: boolean

  /** 手势开始回调 */
  onStart: () => void

  /** 缩放复位回调 */
  scaleBack: () => void

  /** 关闭菜单回调 */
  close: () => void
}
