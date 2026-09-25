/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 19:06:32
 */
import { _ } from '@stores'
import { levelStyles } from '../../levels'

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
    borderTopWidth: _.hairlineWidth,
    borderLeftWidth: _.hairlineWidth,
    borderColor: _.select('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')
  },
  content: {
    width: '92%'
  },
  /** 自己的格子: 橙色底, 覆盖档位色阶 */
  mine: {
    backgroundColor: _.colorDepthAsk
  },
  ...levelStyles()
}))
