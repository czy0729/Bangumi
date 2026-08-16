/*
 * @Author: czy0729
 * @Date: 2026-08-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 00:00:00
 */
import type { Props as TimelineProps } from '../types'
import type { UserId } from '@types'

type P1 = NonNullable<TimelineProps['p1']>
type P2 = NonNullable<TimelineProps['p2']>
type P3 = NonNullable<TimelineProps['p3']>
type P4 = NonNullable<TimelineProps['p4']>
type Image = ReadonlyArray<NonNullable<TimelineProps['image']>[number]>
type P3Text = ReadonlyArray<P3['text'][number]>

export type Props = {
  /** 封面或人物头像 */
  image: Image

  /** 位置 1 文字 */
  p1Text: P1['text']

  /** 位置 1 地址 */
  p1Url: P1['url']

  /** 位置 2 文字 */
  p2Text: P2['text']

  /** 位置 3 文字 */
  p3Text: P3Text

  /** 位置 3 地址 */
  p3Url: P3['url']

  /** 位置 4 文字 */
  p4Text: P4['text']

  /** 用户 ID */
  userId: UserId

  /** 头像地址 */
  avatarSrc: NonNullable<TimelineProps['avatar']>['src']

  /** 点击跳转回调 */
  onNavigate: (url: string, passParams?: object) => void
}
