/*
 * @Author: czy0729
 * @Date: 2023-04-04 10:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:50:06
 */
import type { ReactNode } from 'react'
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 模拟错误 */
  error?: Error

  children: Exclude<NonNullable<ReactNode>, string | number | boolean>
}>

export type State = {
  error: Error | null
}
