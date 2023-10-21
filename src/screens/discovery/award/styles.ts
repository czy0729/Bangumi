/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-21 17:32:51
 */
import { _ } from '@stores'

const backgroundColor = 'rgb(0, 0, 0)'

export const styles = _.create({
  container: {
    backgroundColor
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor
  },
  extra: {
    maginTop: _.sm,
    opacity: 0.6
  },
  webview: {
    paddingTop: _.statusBarHeight,
    backgroundColor
  }
})
