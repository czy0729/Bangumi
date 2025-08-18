/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:17:24
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 02:17:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  code: {
    paddingVertical: _.md,
    paddingHorizontal: _.md,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
