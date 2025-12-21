/*
 * @Author: czy0729
 * @Date: 2025-08-15 14:54:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 18:21:57
 */
import { PropsWithChildren } from 'react'
import { RefreshControlProps } from 'react-native'
import { ScrollViewProps } from '@components'
import { Fn } from '@types'

export type Props = PropsWithChildren<
  Pick<ScrollViewProps, 'forwardRef' | 'style' | 'contentContainerStyle' | 'onScroll'> &
    Pick<RefreshControlProps, 'colors' | 'titleColor' | 'tintColor' | 'progressBackgroundColor'> & {
      onRefresh?: Fn
    }
>
