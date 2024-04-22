/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 03:23:35
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
    width: 1,
    height: 20,
    marginHorizontal: 2,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.64
  }
}))
