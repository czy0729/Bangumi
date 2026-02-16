/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:54:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-09 23:13:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  blocks: {
    paddingTop: _.sm - 2,
    paddingHorizontal: _.wind,
    paddingBottom: _.md - 2
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
