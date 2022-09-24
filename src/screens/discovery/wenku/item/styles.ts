/*
 * @Author: czy0729
 * @Date: 2022-09-12 16:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 17:32:08
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
  body: {
    width: '100%'
  },
  tip: {
    paddingRight: 24,
    marginBottom: _.xs
  },
  lv: {
    paddingRight: 24,
    marginTop: _.xs
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 1 * _.lineHeightRatio,
    left: 0
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
