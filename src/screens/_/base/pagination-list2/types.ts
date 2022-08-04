/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 16:35:37
 */
import { ListViewProps } from '@components'
import { Fn, Override } from '@types'

export type Props = Override<
  ListViewProps,
  {
    connectRef: Fn
    data: any[]
    limit?: number
    onPage?: (nextPageData?: any[]) => any
  }
>
