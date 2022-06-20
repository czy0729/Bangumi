/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 12:59:58
 */
import { LIST_EMPTY } from '@constants'

export const DEFAULT_PROPS = {
  styles: {},
  connectRef: () => {},
  data: LIST_EMPTY,
  title: '',
  scrollToTop: false,
  onHeaderRefresh: () => {},
  onFooterRefresh: undefined
}
