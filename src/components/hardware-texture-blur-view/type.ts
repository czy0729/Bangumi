/*
 * @Author: czy0729
 * @Date: 2023-09-04 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-04 04:49:15
 */
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type HardwareTextureRootBlurViewProps = PropsWithChildren<
  WithViewStyles<{
    name?: string
  }>
>

export type HardwareTextureBlurViewProps = WithViewStyles<{
  containerStyle?: any
  name?: string
}>
