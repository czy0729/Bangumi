/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:50:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:31:29
 */
import type { EventType, SubjectId, UserId, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    full?: boolean
    avatar?: {
      url?: string
      src?: string
    }
    p1?: {
      text: string
      url: string
    }
    p2?: {
      text: string
    }
    p3?: {
      text: string[]
      url: string[]
    }
    p4?: {
      text: string
    }
    image?: string[]
    comment?: string
    reply?: {
      count: string | number
      url?: string
      content?: string
    }
    like?: {
      type: string | number
      mainId: string | number
      relatedId: string | number
    }
    time?: string
    star?: string | number
    subject?: string
    subjectId?: SubjectId
    clearHref?: string
    index?: number
    event?: EventType
    onDelete?: (clearHref?: string) => any
    onHidden?: (title?: string, userId?: UserId) => any
  }>
>
