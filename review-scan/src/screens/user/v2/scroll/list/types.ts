/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:09:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 16:32:55
 */
import { ListViewProps } from '@components'
import { Fn, SubjectType } from '@types'

export type Props = {
  title: string
  page: number
  scrollY: any
  subjectType?: SubjectType
  onRefreshOffset: Fn
  onScroll: ListViewProps['onScroll']
}
