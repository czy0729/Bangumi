/*
 * @Author: czy0729
 * @Date: 2025-10-16 19:37:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 19:39:00
 */
import type { TouchableProps } from '@components'
import { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  onPress: TouchableProps['onPress']
}>
