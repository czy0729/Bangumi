/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 07:07:21
 */
import { ListViewProps } from '@components'
import { Fn, Override } from '@types'

export type Props<ItemT> = Override<
  ListViewProps<ItemT>,
  {
    data: ItemT[] | readonly ItemT[]

    /** 链接 ref */
    forwardRef?: Fn

    /** @deprecated */
    connectRef?: Fn

    /** 一页渲染个数 (网页端因为页面滚动状态不能保存, 故不使用下拉更多加载) */
    limit?: number

    /** 下一页回调 */
    onPage?: (nextPageData?: ItemT[], nextPage?: number) => any

    /** 下下一页回调 (用于提前加载) */
    onNextPage?: (nextPageData?: ItemT[]) => any
  }
>
