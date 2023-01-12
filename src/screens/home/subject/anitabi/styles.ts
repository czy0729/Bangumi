/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:39:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-12 08:37:19
 */
import { _ } from '@stores'
import { THUMB_HEIGHT, THUMB_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  image: {
    height: THUMB_HEIGHT,
    overflow: 'hidden'
  },
  void: {
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  title: {
    width: THUMB_WIDTH,
    paddingTop: _.sm
  },
  sub: {
    width: THUMB_WIDTH,
    paddingTop: _.xs
  },
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
