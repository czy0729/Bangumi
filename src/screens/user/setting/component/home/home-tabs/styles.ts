/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 14:21:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  blocks: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md - 2
  },
  tabs: {
    paddingHorizontal: _.xs,
    marginTop: _.md,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  split: {
    width: 2,
    height: 12,
    marginRight: 2,
    marginLeft: 12,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.64
  }
}))
