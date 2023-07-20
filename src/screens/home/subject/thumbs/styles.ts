/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-14 13:22:50
 */
import { _ } from '@stores'
import { IMAGE_HEIGHT } from './ds'

export const styles = _.create({
  container: {
    minHeight: 210,
    marginTop: _.lg
  },
  image: {
    height: IMAGE_HEIGHT,
    marginLeft: _.sm + 2,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  imageSide: {
    height: IMAGE_HEIGHT,
    borderRadius: _.radiusXs,
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
    height: IMAGE_HEIGHT,
    opacity: 0.92
  },
  icon: {
    fontSize: 40,
    lineHeight: _.ios(52, 56)
  },
  title: {
    padding: _.sm,
    opacity: 0.8
  }
})
