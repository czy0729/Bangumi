/*
 * @Author: czy0729
 * @Date: 2023-08-01 06:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:57:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingVertical: _.sm
  },
  bgms: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind - _._wind - _.device(0, 16)
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
