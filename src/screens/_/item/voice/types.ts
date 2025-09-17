/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 12:05:39
 */
import { PropsWithChildren } from 'react'
import { MonoVoicesItem } from '@stores/subject/types'
import { EventType, Navigation, Override, ViewStyle } from '@types'

export type Props = PropsWithChildren<
  Override<
    MonoVoicesItem,
    {
      navigation?: Navigation
      style?: ViewStyle
      event?: EventType
      index?: number
    }
  >
>
