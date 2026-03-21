/*
 * @Author: czy0729
 * @Date: 2025-10-20 15:50:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 21:18:05
 */
import type { CoverProps } from '@components'
import type { HomeItem } from '@stores/calendar/types'
import type { SubjectTypeCn } from '@types'

export type Props = {
  title: SubjectTypeCn
  src: CoverProps['src']
  cn: string
  data: HomeItem
}
