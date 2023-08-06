/*
 * @Author: czy0729
 * @Date: 2023-08-01 06:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 06:19:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bgms: {
    paddingVertical: _.sm
  },
  bgm: {
    width: _.isLandscape ? '7.14%' : '14.28%',
    paddingVertical: _.md
  },
  replys: {
    marginHorizontal: _.wind,
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.select('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')
  },
  reply: {
    paddingVertical: 12
  },
  lock: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginLeft: 14
  }
}))
