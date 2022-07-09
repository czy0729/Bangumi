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
    data: Override<
      ListEmpty<T>,
      {
        _filter?: any
      }
    >
    keyExtractor: (item: object) => string | number | boolean
    renderItem: (args: { item: T; index: number }) => ReactNode
    ListHeaderComponent?: ReactNode

    // <Footer />
    footerEmptyDataComponent?: any
    footerEmptyDataText?: any
    footerFailureComponent?: any
    footerFailureText?: any
    footerNoMoreDataComponent?: any
    footerRefreshingComponent?: any
    footerRefreshingText?: any
    footerTextType?: any
    showMesume?: any

    // methods
    onHeaderRefresh?: any
    onFooterRefresh?: any
  }
>
