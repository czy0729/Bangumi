/*
 * @Author: czy0729
 * @Date: 2022-09-06 18:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 19:36:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    paddingVertical: _.sm
  },
  row: {
    paddingVertical: 2,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  contentContainerStyle: {
    paddingVertical: _.r(4)
  },
  item: {
    paddingVertical: _.r(4),
    paddingHorizontal: _.r(12),
    borderRadius: _.r(12),
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  }
}))
