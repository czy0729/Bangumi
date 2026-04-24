/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:31:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:41:19
 */
import { _ } from '@stores'

const MARGIN_RIGHT = -(_._wind + _.md)

export const styles = _.create({
  tags: {
    marginRight: MARGIN_RIGHT
  },
  container: {
    paddingRight: _.md
  },
  leftMask: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: 32,
    height: '100%'
  },
  rightMask: {
    position: 'absolute',
    zIndex: 1,
    right: MARGIN_RIGHT,
    width: 32,
    height: '100%'
  }
})
