/*
 * @Author: czy0729
 * @Date: 2025-08-13 17:55:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-08-13 17:55:42
 */
import type { PropsWithChildren } from 'react'
import type { ViewProps } from 'react-native'

export type Props = ViewProps &
  PropsWithChildren<{
    className?: string
  }>
