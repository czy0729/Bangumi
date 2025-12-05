/*
 * @Author: czy0729
 * @Date: 2024-05-17 11:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 11:30:06
 */
import { ListRenderItem } from 'react-native'
import { FlatListPropsWithLayout } from 'react-native-reanimated'
import { Override } from '@types'

export type Props<ItemT> = Override<
  FlatListPropsWithLayout<ItemT>,
  {
    data: ItemT[]
    skipEnteringExitingAnimations: number
    renderItem: ListRenderItem<ItemT>
  }
>
