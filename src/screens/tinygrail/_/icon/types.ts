/*
 * @Author: czy0729
 * @Date: 2024-12-27 06:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:24:16
 */
import type { EventType, Id, MonoId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  id?: MonoId
  monoId: Id
  name: string
  icon: string
  size?: number
  radius?: number
  event?: EventType
}>
