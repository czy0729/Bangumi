/*
 * @Author: czy0729
 * @Date: 2025-08-19 05:06:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 05:29:51
 */
import type { NetworkServiceItem } from '@stores/users/types'
import type { Override } from '@types'

export type Item = Override<
  NetworkServiceItem,
  {
    href?: string
    path?: any
    params?: any
  }
>
