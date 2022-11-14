/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:21:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-14 16:21:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  group: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
