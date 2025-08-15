/*
 * @Author: czy0729
 * @Date: 2024-03-16 15:48:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-16 15:48:46
 */
import { Override } from '@types'
import { Ctx, TitleType } from '../../types'

export type Props = Override<
  Ctx,
  {
    title: TitleType
  }
>
