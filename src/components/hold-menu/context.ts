/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 11:00:00
 *
 * 上下文按变化频率拆分, 开合菜单只重渲染 Menu:
 * - MenuContext: 稳定引用 (shared value / 回调), HoldItem 与 Backdrop 消费
 * - MenuParamsContext: 开合变化的菜单内容与位置, 仅 Menu 消费
 * - MenuShowContext: 遮罩显隐布尔值, 仅 Backdrop 消费
 */
import { createContext, useContext } from 'react'

import type { ScrollView } from 'react-native'
import type { AnimatedRef, SharedValue } from 'react-native-reanimated'
import type { MenuOpenParams, MenuPosition } from './types'

/** 拖动选择上下文 */
export type MenuHighlightContextValue = {
  /** 拖动悬停高亮的菜单项索引, -1 为无 */
  highlightIndex: SharedValue<number>

  /** 菜单内容滚动偏移, 非 ScrollView 模式恒为 0 */
  scrollOffset: SharedValue<number>

  /** 菜单 ScrollView 的 animated ref, 供拖动手势驱动内容滚动 */
  scrollViewRef: AnimatedRef<ScrollView>

  /** 各菜单项在内容中的起始纵坐标 (onLayout 实测), 供拖动命中测试 */
  rowOffsets: SharedValue<number[]>

  /** 内容完整高度 (onLayout 实测), 供滚动上限计算 */
  contentHeight: SharedValue<number>
}

/** 菜单稳定上下文, 值均为稳定引用, 变化不触发消费者 re-render */
export type MenuContextValue = {
  /** 展开状态 (0 关闭, 1 打开) */
  active: SharedValue<number>

  /** 菜单位置, 内容提交后写入, 激活展开时读取, null 为未打开 */
  position: SharedValue<MenuPosition | null>

  /** 菜单主题 */
  theme: 'light' | 'extraLight' | 'dark'

  /** 底部安全距离 */
  paddingBottom: number

  /** 提交菜单内容并计算位置, 不激活展开动画 */
  open: (params: MenuOpenParams) => void

  /** 内容提交完成后激活展开动画 */
  activate: () => void

  /** 关闭菜单 */
  close: () => void

  /** 拖动选择上下文 */
  highlight: MenuHighlightContextValue
}

/** 菜单参数上下文, 仅 Menu 消费, 避免开合时全量 re-render */
export type MenuParamsContextValue = {
  /** 当前菜单参数, 保留上次展开内容, 未展开过为 null */
  params: MenuOpenParams | null
}

export const MenuContext = createContext<MenuContextValue | null>(null)
export const MenuParamsContext = createContext<MenuParamsContextValue | null>(null)

/** 遮罩显隐上下文, 仅 Backdrop 消费, 开合菜单不触发其他消费者 re-render */
export const MenuShowContext = createContext(false)

/** 获取菜单稳定上下文 */
export const useHoldMenu = () => {
  const value = useContext(MenuContext)
  if (!value) {
    throw new Error('useHoldMenu must be used within a HoldMenuProvider')
  }
  return value
}

/** 获取菜单参数上下文 */
export const useHoldMenuParams = () => {
  const value = useContext(MenuParamsContext)
  if (!value) {
    throw new Error('useHoldMenuParams must be used within a HoldMenuProvider')
  }
  return value
}
