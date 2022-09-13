/*
 * @Author: czy0729
 * @Date: 2022-09-10 17:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 18:04:08
 */
import { _ } from '@stores'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  imgContainer: {
    width: IMG_WIDTH_LG
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  body: {
    width: '100%'
  }
}))
