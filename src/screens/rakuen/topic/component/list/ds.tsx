/*
 * @Author: czy0729
 * @Date: 2024-01-03 22:15:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:09:03
 */
import { keyExtractor } from '@utils'
import { rc } from '@utils/dev'
import { FROZEN_FN, LIST_EMPTY } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import Top from '../top'

export const COMPONENT = rc(PARENT, 'List')

export const COMPONENT_MAIN = rc(COMPONENT)

export const LISTVIEW_PROPS = {
  keyExtractor,
  scrollEventThrottle: 16,
  initialNumToRender: 120,
  maxToRenderPerBatch: 120,
  updateCellsBatchingPeriod: 120,
  scrollToTop: true,
  keyboardDismissMode: 'on-drag',
  ListHeaderComponent: <Top />
}

export const DEFAULT_PROPS = {
  forwardRef: FROZEN_FN,
  data: LIST_EMPTY as $['comments'],
  postId: '' as $['postId'],
  onScroll: FROZEN_FN,
  onScrollToIndexFailed: FROZEN_FN,
  onHeaderRefresh: FROZEN_FN,
  onShowFixedTextarea: FROZEN_FN
}
