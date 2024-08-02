/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 19:39:46
 */
import { ListViewProps } from '@components'
import { Fn, Override } from '@types'

export type Props<ItemT> = Override<
  ListViewProps<ItemT>,
  {
    /** 链接 ref */
    forwardRef?: Fn
    data: any[]
    limit?: number
    onPage?: (nextPageData?: any[]) => any
  }
>
