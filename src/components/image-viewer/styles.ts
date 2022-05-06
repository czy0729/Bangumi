/*
 * @Author: czy0729
 * @Date: 2022-05-06 17:37:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-06 17:37:21
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    flex: 1,
    minHeight: _.window.height,
    backgroundColor: 'rgba(0, 0, 0, 0.88)'
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%'
  },
  viewer: {
    zIndex: 2
  },
  close: {
    position: 'absolute',
    zIndex: 3,
    top: 40,
    right: 0,
    padding: 16
  },
  iconfont: {
    color: '#fff'
  },
  indicator: {
    position: 'absolute',
    zIndex: 10,
    top: _.appBarHeight + 14,
    right: 0,
    left: 0
  }
})
