/*
 * @Author: czy0729
 * @Date: 2024-08-04 04:50:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 16:56:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.r(2),
    paddingHorizontal: _.r(8),
    marginRight: _.r(8),
    marginBottom: _.r(8),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  meta: {
    borderColor: _.select(_.colorPrimaryBorder, _.colorIcon)
  }
}))
