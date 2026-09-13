/*
 * @Author: czy0729
 * @Date: 2022-05-03 16:08:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 19:10:10
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    backgroundColor: '#1677ff',
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  clear: {
    position: 'absolute',
    zIndex: 1000,
    left: _._wind,
    bottom: _.r(40)
  },
  clearTouch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 40,
    height: 40
  },
  scroll: {
    position: 'absolute',
    zIndex: 1000,
    right: _.sm,
    left: _.sm,
    bottom: _.lg,
    height: 320,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: _.radiusSm
  },
  container: {
    padding: _.md
  }
})
