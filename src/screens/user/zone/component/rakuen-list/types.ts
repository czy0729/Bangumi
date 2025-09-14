/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:08:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:49:42
 */
import { ListViewProps } from '@components'

export type Props = {
  ListHeaderComponent?: ListViewProps<any>['ListHeaderComponent']
  onScroll?: ListViewProps<any>['onScroll']
}
