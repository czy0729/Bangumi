/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:40:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 14:56:15
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'
import { THUMB_HEIGHT } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md
  },
  content: {
    flex: 1,
    minHeight: IMG_HEIGHT_LG,
    marginLeft: _._wind
  },
  body: {
    marginRight: _.wind
  },
  thumbs: {
    marginTop: _.md,
    height: THUMB_HEIGHT
  },
  nums: {
    width: THUMB_HEIGHT,
    height: THUMB_HEIGHT,
    marginRight: _._wind,
    marginLeft: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
