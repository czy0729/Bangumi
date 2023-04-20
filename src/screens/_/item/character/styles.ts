/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:39:10
 */
import { _ } from '@stores'
import { IMG_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  inViewCover: {
    minWidth: IMG_WIDTH,
    minHeight: IMG_WIDTH
  },
  inViewAvatar: {
    minWidth: _.r(32),
    minHeight: _.r(32)
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  touch: {
    paddingLeft: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchActor: {
    minWidth: 128,
    marginTop: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  position: {
    marginTop: _.sm,
    marginRight: _.sm
  }
}))
