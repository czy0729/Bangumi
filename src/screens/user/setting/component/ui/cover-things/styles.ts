/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 22:16:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    height: 104
  },
  gameContainer: {
    marginTop: 2,
    marginLeft: 2,
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel2)
  },
  gameBody: {
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  gameAngle: {
    width: 6,
    height: 4,
    marginTop: 3,
    borderWidth: 4,
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  musicAngle: {
    marginRight: -4
  }
}))
