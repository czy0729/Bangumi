/*
 * @Author: czy0729
 * @Date: 2026-04-24 11:29:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:29:23
 */
import type { Fn } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  active?: boolean
  onPress?: Fn
}>
