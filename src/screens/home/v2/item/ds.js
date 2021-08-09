/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:24:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:54:46
 */
import { _ } from '@stores'
import { IMG_WIDTH } from '@constants'

export const itemPadding = _._wind
export const layoutWidth = _.window.contentWidth - _.wind
export const wrapWidth = layoutWidth - IMG_WIDTH - _.wind - itemPadding + 2

export const defaultProps = {
  styles: {},
  index: 0,
  subject: {},
  subjectId: 0,
  epStatus: '',
  heatMap: false,
  expand: false,
  isTop: false,
  onItemPress: Function.prototype
}
