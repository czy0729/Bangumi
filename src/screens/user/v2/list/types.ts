/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:09:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 07:30:04
 */
import { ListViewProps } from '@components'
import { SubjectType } from '@types'

export type Props = {
  title: string
  page: number
  scrollY: any
  subjectType?: SubjectType
  scrollEventThrottle: ListViewProps['scrollEventThrottle']
  ListHeaderComponent: ListViewProps['ListHeaderComponent']
  onScroll: ListViewProps['onScroll']
}
