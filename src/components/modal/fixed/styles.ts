/*
 * @Author: czy0729
 * @Date: 2023-11-26 09:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 20:21:51
 */
import { _ } from '@stores'
import { MASK_COLOR } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: MASK_COLOR
  },
  fixed: {
    position: 'absolute',
    zIndex: 1001,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingBottom: _.tabBarHeight
  },
  container: {
    maxHeight: Math.floor(_.window.height * 0.75)
  },
  modal: {
    height: 'auto',
    paddingTop: _.md,
    paddingRight: _.md,
    paddingBottom: _.md,
    paddingLeft: _.md,
    marginTop: 0
  }
}))
