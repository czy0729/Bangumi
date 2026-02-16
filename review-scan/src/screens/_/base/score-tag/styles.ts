/*
 * @Author: czy0729
 * @Date: 2022-06-13 17:03:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 17:33:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: _.select(_.colorMain, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
