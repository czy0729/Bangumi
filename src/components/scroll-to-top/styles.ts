/*
 * @Author: czy0729
 * @Date: 2022-05-04 16:04:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:37:10
 */
import { _ } from '@stores'
import { STATUS_BAR_HEIGHT } from '@styles'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: STATUS_BAR_HEIGHT + 10
  },
  scrollToTop: {
    position: 'absolute',
    zIndex: 1000,
    right: _._wind,
    bottom: _.r(64)
  },
  touch: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  icon: {
    width: 40,
    height: 40
  }
}))
