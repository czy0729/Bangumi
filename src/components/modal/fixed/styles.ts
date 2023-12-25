/*
 * @Author: czy0729
 * @Date: 2023-11-26 09:00:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:07:02
 */
import { _ } from '@stores'

export const styles = _.create({
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
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
    maxHeight: _.window.height * 0.75
  },
  modal: {
    height: 'auto',
    paddingTop: _.md,
    paddingRight: _.md,
    paddingBottom: _.md,
    paddingLeft: _.md,
    marginTop: 0
  }
})
