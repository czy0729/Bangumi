/*
 * @Author: czy0729
 * @Date: 2022-09-10 17:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-08 22:03:55
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  inView: {
    minWidth: IMG_WIDTH_LG,
    minHeight: IMG_HEIGHT_LG
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  tip: {
    minHeight: 64,
    marginTop: -12
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
