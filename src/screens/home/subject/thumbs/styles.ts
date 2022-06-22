/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 01:42:41
 */
import { _ } from '@stores'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'

export const styles = _.create({
  image: {
    height: THUMB_HEIGHT,
    overflow: 'hidden'
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  touch: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    opacity: 0.88
  },
  icon: {
    fontSize: 40,
    lineHeight: 40
  },
  title: {
    width: THUMB_WIDTH,
    padding: _.xs,
    opacity: 0.64
  }
})
