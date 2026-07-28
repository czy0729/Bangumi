/*
 * @Author: czy0729
 * @Date: 2023-12-29 19:37:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:15:41
 */
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  /** 当前激活页码 */
  current: number

  /** 当前组件对应页码 */
  index: number

  /** 触发懒加载的提前距离 */
  distance?: number
}>
