/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 底部信息条 props 定义
 */
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Required<Pick<ComponentProps, 'id' | 'tags'>> &
    Pick<ComponentProps, 'score' | 'rank' | 'total' | 'simpleStars' | 'time' | 'hideScore'>,
  {
    /** 是否有评论 */
    hasComment?: boolean
  }
>
