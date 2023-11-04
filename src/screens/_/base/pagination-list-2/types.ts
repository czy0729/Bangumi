/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 18:46:41
 */
import { ListViewProps } from '@components'
import { Fn, Override } from '@types'

export type Props = Override<
  ListViewProps,
  {
    data: any[]

    /** 链接 ref */
    forwardRef?: Fn

    /** @deprecated */
    connectRef?: Fn

    /** 一页渲染个数 (网页端因为页面滚动状态不能保存, 故不使用下拉更多加载) */
    limit?: number

    /** 下一页回调 */
    onPage?: (nextPageData?: any[]) => any

    /** 下下一页回调 */
    onNextPage?: (nextPageData?: any[]) => any
  }
>
