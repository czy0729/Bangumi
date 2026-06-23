/*
 * @Author: czy0729
 * @Date: 2026-06-23 16:58:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-23 17:00:05
 */
import type { SubjectCommentsItem } from '@stores/subject/types'
import type { WithIndex } from '@types'

export type Props = WithIndex<
  Pick<
    SubjectCommentsItem,
    | 'action'
    | 'avatar'
    | 'comment'
    | 'mainId'
    | 'mainName'
    | 'relatedId'
    | 'star'
    | 'time'
    | 'userId'
    | 'userName'
  >
>
