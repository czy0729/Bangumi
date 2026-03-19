/*
 * @Author: czy0729
 * @Date: 2022-06-15 13:43:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:18:59
 */
import type { PropsWithChildren } from 'react'
import type { EventType, WithNavigation, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithNavigation<
    WithViewStyles<{
      event?: EventType
    }>
  >
>
