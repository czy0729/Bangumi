/*
 * @Author: czy0729
 * @Date: 2025-10-20 15:50:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:51:42
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
