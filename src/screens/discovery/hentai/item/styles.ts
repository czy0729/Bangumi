/*
 * @Author: czy0729
 * @Date: 2022-09-11 12:25:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 12:25:48
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

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
  contentFlux: {
    minHeight: IMG_HEIGHT_LG
  },
  body: {
    width: '100%'
  },
  tag: {
    marginTop: 6,
    marginRight: 6
  }
}))
