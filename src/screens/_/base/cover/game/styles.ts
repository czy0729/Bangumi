/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:17:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  game: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderWidth: 5,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 16
  },
  head: {
    width: 24,
    height: 2,
    marginBottom: 2,
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  },
  angle: {
    width: 6,
    height: 4,
    marginTop: 2,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  }
}))
