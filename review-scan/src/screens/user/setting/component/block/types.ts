/*
 * @Author: czy0729
 * @Date: 2024-07-04 05:23:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-04 05:24:37
 */
import { ViewProps } from 'react-native'
import { Override } from '@types'

export type Props = Override<
  ViewProps,
  {
    title?: string
    onBlockRef?: (ref: any, component: string) => void
  }
>
