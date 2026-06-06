/*
 * @Author: czy0729
 * @Date: 2023-04-04 08:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 05:50:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottom: {
    marginTop: _.md,
    marginRight: -(_._wind + _.sm)
  },
  split: {
    width: 3,
    height: 8,
    marginRight: 8,
    marginLeft: _.select(7, 8),
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
