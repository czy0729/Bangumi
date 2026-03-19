/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:43:43
 */
import type { ColorValue, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    color?: ColorValue
    shadow?: boolean
  }>
>
