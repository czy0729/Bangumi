/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:09:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 07:14:24
 */
import { ListViewProps } from '@components'
import { SubjectType } from '@types'

export type Props = {
  title: string
  page: number
  subjectType?: SubjectType
  scrollEventThrottle: ListViewProps['scrollEventThrottle']
  ListHeaderComponent: ListViewProps['ListHeaderComponent']
  onScroll: ListViewProps['onScroll']
}
