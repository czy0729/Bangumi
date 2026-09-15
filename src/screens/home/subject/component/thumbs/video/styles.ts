/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 18:11:56
 */
import { _ } from '@stores'
import { IMAGE_HEIGHT, THUMB_WIDTH } from '../ds'

export const styles = _.create({
  video: {
    width: THUMB_WIDTH,
    marginRight: _.sm + 2
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
    height: IMAGE_HEIGHT,
    opacity: 0.92
  },
  icon: {
    fontSize: 40,
    lineHeight: _.ios(52, 56),
    opacity: 0.68
  },
  title: {
    padding: _.sm,
    opacity: 0.8
  }
})
