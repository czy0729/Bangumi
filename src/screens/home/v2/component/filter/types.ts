/*
 * @Author: czy0729
 * @Date: 2022-07-15 19:48:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-15 19:57:23
 */
import { Override } from '@types'
import { Ctx, TabsLabel } from '../../types'

export type Props = Override<
  Ctx,
  {
    title: TabsLabel
    length: number
  }
>
