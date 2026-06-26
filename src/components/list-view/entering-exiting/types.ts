/*
 * @Author: czy0729
 * @Date: 2024-05-17 11:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-26 18:00:00
 */
import type { ListRenderItem } from 'react-native'
import type { FlatListPropsWithLayout } from 'react-native-reanimated'
import type { Override } from '@types'

/** 进场出场动画列表组件属性，基于 Reanimated FlatList 扩展 */
export type Props<ItemT> = Override<
  FlatListPropsWithLayout<ItemT>,
  {
    /** 列表数据 */
    data: ItemT[]

    /** 使用动画的最前项个数，超出部分不添加进场动画 */
    skipEnteringExitingAnimations: number

    /** 渲染单个条目 */
    renderItem: ListRenderItem<ItemT>
  }
>
