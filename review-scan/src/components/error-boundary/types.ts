/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:29:02
 */
import { ReactNode } from 'react'
import { ViewStyle } from '@types'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 模拟错误 */
  error?: Error

  children: Exclude<NonNullable<ReactNode>, string | number | boolean>
  // onError?: (error: Error, stackTrace: string) => void
}

export type State = {
  error: Error | null
}
