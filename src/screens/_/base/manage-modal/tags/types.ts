/*
 * @Author: czy0729
 * @Date: 2025-10-21 16:19:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:25:34
 */
import type { SubjectId, SubjectType } from '@types'

export type Props = {
  subjectId: SubjectId
  tags: string
  type: SubjectType
  fetching: boolean
  showTags: boolean
  showUserTags: boolean
  onFetchTags: () => void
  onToggleTag: (name: string) => void
  onToggleTagsRecent: () => void
  onToggleTagsUser: () => void
}
