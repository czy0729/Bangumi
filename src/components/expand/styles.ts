/*
 * @Author: czy0729
 * @Date: 2022-05-01 14:39:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-31 11:26:59
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    overflow: 'hidden'
  },
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  linear: {
    position: 'absolute',
    right: 0,
    bottom: -2,
    left: 0,
    height: 64
  },
  more: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    bottom: -_.md,
    left: 0,
    paddingVertical: _.md,
    paddingHorizontal: 100,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
