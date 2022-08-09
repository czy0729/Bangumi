/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 07:03:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
