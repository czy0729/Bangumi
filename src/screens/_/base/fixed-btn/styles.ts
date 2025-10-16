/*
 * @Author: czy0729
 * @Date: 2025-10-16 19:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 21:41:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  fixed: {
    position: 'absolute',
    right: 0,
    bottom: _.bottom - _.sm,
    left: 0,
    pointerEvents: 'box-none'
  },
  btn: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    backgroundColor: _.select(_.colorMainLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorMainBorder, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderRadius: _.radiusSm,
    ..._.shadow
  }
}))
