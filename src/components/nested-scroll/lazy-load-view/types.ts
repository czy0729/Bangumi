/*
 * @Author: czy0729
 * @Date: 2023-12-29 19:37:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 */
import type { PropsWithChildren, ReactNode } from 'react'

export type Props = PropsWithChildren<{
  /** 当前激活页码 */
  current: number

  /** 当前组件对应页码 */
  index: number

  /** 触发懒加载的提前距离 (Infinity 表示不卸载) */
  distance?: number

  /** 显式保活区间, 优先于 current/distance (跨页切换期间为并集) */
  range?: readonly [number, number]

  /** 未激活时的占位内容 (PagerView 等要求子节点数量恒定的容器使用) */
  placeholder?: ReactNode
}>
