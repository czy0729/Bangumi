/*
 * @Author: czy0729
 * @Date: 2022-07-07 21:16:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 08:15:01
 */
import { RecyclerListViewProps } from 'recyclerlistview'
import { ListEmpty, Override, ReactNode } from '@types'

export type ListViewRecyclerProps<T = any> = Override<
  RecyclerListViewProps,
  {
    layoutProvider?: never
    dataProvider?: never
    rowRenderer?: never
    data: ListEmpty<T>
    keyExtractor: (item: object) => string | number | boolean
    renderItem: (args: { item: T; index: number }) => ReactNode
    ListHeaderComponent?: ReactNode
  }
>
