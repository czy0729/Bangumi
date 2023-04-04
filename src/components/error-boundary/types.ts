/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 12:05:53
 */
import { type ReactNode } from 'react'
import { type ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  children: Exclude<NonNullable<ReactNode>, string | number | boolean>
  // onError?: (error: Error, stackTrace: string) => void
}

export type State = {
  error: Error | null
}
