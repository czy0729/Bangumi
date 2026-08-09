/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:27:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:27:47
 */
import type { ElementType, PropsWithChildren } from 'react'
import type { ViewStyle } from '@types'

/** 菜单项点击事件 */
export type MenuPressEvent = {
  /** 点击位置相对窗口的横坐标 */
  pageX?: number

  /** 点击位置相对窗口的纵坐标 */
  pageY?: number
}

/** 菜单项 */
export type MenuItemProps = {
  /** 文本 */
  text: string

  /** 图标 (暂不支持) */
  icon?: string

  /** 是否为标题 */
  isTitle?: boolean

  /** 是否为破坏性操作 */
  isDestructive?: boolean

  /** 是否显示下方分隔线 */
  withSeparator?: boolean

  /** 点击回调, 第一个参数为点击事件, 若有 actionParams 则随后展开 */
  onPress?: (evt?: MenuPressEvent, ...args: unknown[]) => void
}

/** 菜单锚点位置 */
export type MenuAnchorPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'

/** 菜单打开参数 */
export type MenuOpenParams = {
  /** 菜单项 */
  items: MenuItemProps[]

  /** 锚点相对窗口的横坐标 */
  anchorX: number

  /** 锚点相对窗口的纵坐标 */
  anchorY: number

  /** 锚点宽度 */
  anchorWidth: number

  /** 锚点高度 */
  anchorHeight: number

  /** 点击已打开的菜单项时是否关闭 */
  closeOnTap?: boolean

  /** 是否禁止菜单与按钮位移 */
  disableMove?: boolean

  /** 是否从底部展开 */
  bottom?: boolean

  /** 菜单锚点位置 (暂不参与计算, 仅作兼容) */
  menuAnchorPosition?: MenuAnchorPosition

  /** 菜单项点击参数映射 */
  actionParams?: {
    [name: string]: unknown[]
  }
}

/** 触发反馈 */
export type HapticFeedbackStyle =
  | 'None'
  | 'Selection'
  | 'Light'
  | 'Medium'
  | 'Heavy'
  | 'Success'
  | 'Warning'
  | 'Error'

/** 菜单位置 (与展开状态同帧写入 shared value, 保证首帧位置正确) */
export type MenuPosition = {
  /** 菜单左边缘相对窗口的横坐标 */
  left: number

  /** 菜单基础位置, 实际显示位置为 top + tY */
  top: number

  /** 菜单宽度 */
  width: number

  /** 菜单高度 */
  height: number

  /** 缩放锚点相对窗口的横坐标 */
  originX: number

  /** 缩放锚点相对窗口的纵坐标 */
  originY: number

  /** 菜单与按钮的整体位移量, 菜单放不下时向合适方向挤开 */
  tY: number
}

/** HoldMenuProvider 属性 */
export type Props = PropsWithChildren<{
  /** 菜单主题, 同时影响遮罩和毛玻璃 */
  theme?: 'light' | 'extraLight' | 'dark'

  /** 图标组件 (兼容, 暂不使用) */
  iconComponent?: ElementType

  /** 底部安全距离, 主要用于菜单贴底时不遮挡底部指示条 */
  paddingBottom?: number
}>

/** HoldItem 属性 */
export type HoldItemProps = PropsWithChildren<{
  /** 菜单项 */
  items: MenuItemProps[]

  /** 菜单项点击参数映射 */
  actionParams?: {
    [name: string]: unknown[]
  }

  /** 菜单锚点位置 */
  menuAnchorPosition?: MenuAnchorPosition

  /** 是否禁止菜单位移 */
  disableMove?: boolean

  /** 容器样式 */
  containerStyles?: ViewStyle

  /** 是否从底部展开 */
  bottom?: boolean

  /** 激活方式 */
  activateOn?: 'tap' | 'double-tap' | 'hold'

  /** 触发反馈 */
  hapticFeedback?: HapticFeedbackStyle

  /** 点击已打开的菜单项时是否关闭 */
  closeOnTap?: boolean
}>
