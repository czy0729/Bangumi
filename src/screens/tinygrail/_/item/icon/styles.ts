/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:14:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 17:14:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    marginTop: _.md,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
