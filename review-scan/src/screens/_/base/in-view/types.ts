/*
 * @Author: czy0729
 * @Date: 2024-08-01 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 20:28:57
 */
import { ViewProps } from 'react-native'
import { DeepPartial, Override } from '@types'

export type Props = Override<
  ViewProps,
  {
    index?: number
    y?: number
    log?: boolean
    flex?: boolean
  }
>

export type Ctx = DeepPartial<{
  $: {
    state: {
      visibleBottom: number
    }
  }
}>
