/*
 * @Author: czy0729
 * @Date: 2024-11-20 11:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:00:17
 */
import { Override } from '@types'
import { Ctx } from '../types'

export type Props = Override<
  Ctx,
  {
    focus: boolean
  }
>
