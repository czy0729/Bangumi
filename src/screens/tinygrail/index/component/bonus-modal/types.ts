/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:19:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:19:26
 */
import { Override } from '@types'
import { Ctx } from '../../types'

export type Props = Override<
  Ctx,
  {
    visible?: boolean
  }
>
