/*
 * @Author: czy0729
 * @Date: 2025-08-13 17:55:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-08-13 17:55:42
 */
import { ViewProps } from 'react-native'
import { ReactNode } from '@types'

export type Props = ViewProps & {
  className?: string
  children?: ReactNode
}
