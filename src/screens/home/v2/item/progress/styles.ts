/*
 * @Author: czy0729
 * @Date: 2022-10-25 14:48:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-25 14:48:46
 */
import { _ } from '@stores'
import { IMG_WIDTH } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  progress: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 4
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  },
  layout: {
    width: _.window.width - 2 * _.wind - IMG_WIDTH - _._wind
  }
}))
