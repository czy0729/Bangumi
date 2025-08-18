/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 18:47:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    position: 'absolute'
  },
  body: {
    flex: 1
  },
  border: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: _.hairlineWidth,
    borderColor: _.select('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')
  },
  content: {
    width: '88%'
  },
  l1: {
    backgroundColor: _.select('rgb(210, 210, 210)', 'rgb(12, 12, 12)')
  },
  l2: {
    backgroundColor: _.select('rgb(222, 222, 222)', 'rgb(20, 20, 20)')
  },
  l3: {
    backgroundColor: _.select('rgb(238, 238, 238)', 'rgb(36, 36, 36)')
  },
  l4: {
    backgroundColor: _.select('rgb(255, 255, 255)', 'rgb(52, 52, 52)')
  }
}))
