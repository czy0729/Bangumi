/*
 * @Author: czy0729
 * @Date: 2024-11-18 08:26:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 13:00:00
 */
import type { Override } from '@types'
import type { Ctx } from '../../types'

export type Props = Override<
  Ctx,
  {
    defaultAvatar: string
    visible: boolean
  }
>
