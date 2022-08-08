/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 07:34:18
 */
import { ListViewProps } from '@components'
import { Fn, Override } from '@types'

export type Props = Override<
  ListViewProps,
  {
    data: any[]
    connectRef?: Fn
    limit?: number
    onPage?: (nextPageData?: any[]) => any
  }
>
