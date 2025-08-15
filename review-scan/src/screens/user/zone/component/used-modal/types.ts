/*
 * @Author: czy0729
 * @Date: 2024-11-18 08:26:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:27:56
 */
import { Override } from '@types'
import { Ctx } from '../../types'

export type Props = Override<
  Ctx,
  {
    defaultAvatar: string
    visible: boolean
  }
>
