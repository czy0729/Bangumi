/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:32:06
 */
import type { PropsWithChildren } from 'react'
import type { TextStyle } from '@types'

export type Props = PropsWithChildren<{
  style?: TextStyle
  showClose?: boolean
}>
