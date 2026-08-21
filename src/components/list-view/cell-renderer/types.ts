/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 13:30:00
 */
import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import type { WithViewStyles } from '@types'

/** FlatList CellRendererComponent 收到的单个条目渲染属性 */
export type CellRendererProps = PropsWithChildren<
  WithViewStyles<{
    index: number
    onLayout?: (event: LayoutChangeEvent) => void
  }>
>

/** CellRenderer 工厂参数 */
export type CellRendererFactoryProps = {
  /** 写回真实高度到缓存 */
  setHeight: (index: number, height: number) => void

  /** 条目预估高度 */
  estimate: number
}
