/*
 * @Author: czy0729
 * @Date: 2025-05-06 21:22:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:23:40
 */
import { Fn, Override } from '@types'
import { Ctx } from '../../types'

export type Props = Override<
  Ctx,
  {
    onScrollToTop: Fn
  }
>
