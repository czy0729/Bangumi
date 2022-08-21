/*
 * @Author: czy0729
 * @Date: 2022-05-06 17:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-21 09:07:45
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
    left: '50%',
    marginLeft: -10
  },
  viewer: {
    zIndex: 2
  },
  viewerContainer: {
    zIndex: 2,
    flex: 1
  },
  viewerMini: {
    width: Math.floor(_.window.width / 1.32),
    height: Math.floor(_.window.height / 1.32),
    marginLeft: Math.floor((_.window.width - _.window.width / 1.32) / 2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  close: {
    position: 'absolute',
    zIndex: 3,
    top: 40,
    right: 0,
    padding: 16
  },
  closeMini: {
    position: 'absolute',
    zIndex: 3,
    bottom: 32,
    left: '50%',
    padding: 16,
    marginLeft: -28
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
