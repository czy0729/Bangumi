/*
 * @Author: czy0729
 * @Date: 2022-06-14 18:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 18:59:05
 */
import { _ } from '@stores'

const vertical = 4

export const memoStyles = _.memoStyles(() => ({
  row: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  contentContainerStyle: {
    paddingVertical: _.r(vertical)
  },
  item: {
    paddingVertical: _.r(vertical),
    paddingHorizontal: _.r(12),
    borderRadius: _.r(12),
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  }
}))
