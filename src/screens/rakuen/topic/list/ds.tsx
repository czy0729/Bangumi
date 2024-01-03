import { ListViewProps } from '@components'
/*
 * @Author: czy0729
 * @Date: 2024-01-03 22:15:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 22:27:58
 */
import { keyExtractor } from '@utils'
import { rc } from '@utils/dev'
import { FN, LIST_EMPTY } from '@constants'
import Top from '../component/top'
import { COMPONENT as PARENT } from '../ds'
import { StoreType as $ } from '../types'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const LISTVIEW_PROPS: ListViewProps = {
  keyExtractor,
  scrollEventThrottle: 4,
  initialNumToRender: 120,
  maxToRenderPerBatch: 120,
  updateCellsBatchingPeriod: 120,
  scrollToTop: true,
  keyboardDismissMode: 'on-drag',
  ListHeaderComponent: <Top />
}

export const DEFAULT_PROPS = {
  forwardRef: FN,
  data: LIST_EMPTY as $['comments'],
  postId: '' as $['postId'],
  onScroll: FN,
  onScrollToIndexFailed: FN,
  onHeaderRefresh: FN,
  onShowFixedTextarea: FN
}
