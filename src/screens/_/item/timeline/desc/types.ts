/*
 * @Author: czy0729
 * @Date: 2026-08-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 00:00:00
 */
import type { Props as TimelineProps } from '../types'

type Reply = NonNullable<TimelineProps['reply']>
type Image = ReadonlyArray<NonNullable<TimelineProps['image']>[number]>

export type Props = Pick<
  TimelineProps,
  'navigation' | 'subject' | 'subjectId' | 'comment' | 'event'
> & {
  /** 封面或人物头像 */
  image: Image

  /** 回复内容 */
  replyContent: Reply['content']

  /** 回复数 */
  replyCount: Reply['count']
}
