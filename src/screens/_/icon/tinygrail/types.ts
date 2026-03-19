/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:32:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:37:18
 */
import type { ColorValue, EventType, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    color?: ColorValue
    event?: EventType
  }>
>
