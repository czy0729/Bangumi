/*
 * @Author: czy0729
 * @Date: 2022-05-06 17:46:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-06 17:46:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  page: {
    position: 'absolute',
    zIndex: 10000,
    top: 0,
    right: _.wind,
    left: 0,
    height: _.window.height - _._wind
  },
  position: {
    position: 'absolute',
    zIndex: 10000,
    right: 0,
    bottom: 0
  },
  block: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1
  },
  text: {
    position: 'absolute',
    zIndex: 10001,
    padding: _.xs,
    backgroundColor: _.select('rgba(0, 0, 0, 0.64)', 'rgba(0, 0, 0, 0.7)')
  },
  textTo: {
    backgroundColor: 'rgba(15, 61, 67, 0.88)'
  },
  textFrom: {
    backgroundColor: 'rgba(62, 84, 108, 0.88)'
  },
  textMini: {
    width: '120%'
  },
  control: {
    position: 'absolute',
    zIndex: 10001,
    top: _.window.height / 1.5,
    right: 0,
    backgroundColor: _.select('rgba(0, 0, 0, 0.64)', 'rgba(0, 0, 0, 0.7)')
  },
  controlItem: {
    paddingVertical: 8,
    paddingHorizontal: 4
  }
}))
