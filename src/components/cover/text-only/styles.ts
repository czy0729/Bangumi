/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 10:07:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  textOnly: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  radius: {
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
