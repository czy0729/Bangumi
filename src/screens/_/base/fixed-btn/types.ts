/*
 * @Author: czy0729
 * @Date: 2025-10-16 19:37:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:22:27
 */
import type { PropsWithChildren } from 'react'
import type { TouchableProps } from '@components'

export type Props = PropsWithChildren<{
  onPress: TouchableProps['onPress']
}>
