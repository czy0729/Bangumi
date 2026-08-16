/*
 * @Author: czy0729
 * @Date: 2026-08-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 00:00:00
 */
import type { Props as TimelineProps } from '../types'
import type { UserId } from '@types'

type Avatar = NonNullable<TimelineProps['avatar']>
type P1 = NonNullable<TimelineProps['p1']>

export type Props = Pick<TimelineProps, 'navigation' | 'event'> & {
  /** 用户名 */
  p1Text: P1['text']

  /** 用户 ID */
  userId: UserId

  /** 头像地址 */
  avatarSrc: Avatar['src']
}