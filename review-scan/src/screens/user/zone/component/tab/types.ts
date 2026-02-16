/*
 * @Author: czy0729
 * @Date: 2024-05-01 08:15:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:24:03
 */
import { Fn, Override } from '@types'
import { Ctx } from '../../types'

export type Props = Override<
  Ctx,
  {
    scrollEventThrottle: number
    onIndexChange: Fn
    onScroll: Fn
    onSwipeStart: Fn
  }
>
