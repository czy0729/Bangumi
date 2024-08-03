/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:34:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 05:48:58
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
  disabled: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  }
}))
