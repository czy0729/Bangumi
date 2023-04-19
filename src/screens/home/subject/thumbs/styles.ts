/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:21:30
 */
import { _ } from '@stores'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'

export const styles = _.create({
  container: {
    minHeight: 158,
    marginTop: _.lg
  },
  image: {
    height: THUMB_HEIGHT,
    marginLeft: _.sm,
    overflow: 'hidden'
  },
  imageSide: {
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
    opacity: 0.92
  },
  icon: {
    fontSize: 40,
    lineHeight: _.ios(52, 56)
  },
  title: {
    width: THUMB_WIDTH,
    padding: _.sm,
    opacity: 0.8
  }
})
