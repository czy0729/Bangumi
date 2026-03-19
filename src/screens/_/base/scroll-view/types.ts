/*
 * @Author: czy0729
 * @Date: 2025-08-15 14:54:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:23:30
 */
import type { PropsWithChildren } from 'react'
import type { RefreshControlProps } from 'react-native'
import type { ScrollViewProps } from '@components'
import type { Fn } from '@types'

export type Props = PropsWithChildren<
  Pick<ScrollViewProps, 'forwardRef' | 'style' | 'contentContainerStyle' | 'onScroll'> &
    Pick<RefreshControlProps, 'colors' | 'titleColor' | 'tintColor' | 'progressBackgroundColor'> & {
      onRefresh?: Fn
    }
>
