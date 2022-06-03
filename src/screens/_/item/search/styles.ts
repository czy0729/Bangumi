/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 15:18:11
 */
import { _ } from '@stores'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    flex: 1,
    height: IMG_HEIGHT_LG,
    marginLeft: _._wind
  },
  flux: {
    height: 'auto',
    minHeight: IMG_HEIGHT_LG
  },
  musicContent: {
    height: 'auto',
    minHeight: IMG_WIDTH_LG
  }
}))
