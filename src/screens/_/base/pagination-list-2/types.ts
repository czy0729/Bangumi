/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 12:41:04
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

    /** 一页渲染个数 */
    limit?: number

    /** 下一页回调 */
    onPage?: (nextPageData?: any[]) => any
  }
>
