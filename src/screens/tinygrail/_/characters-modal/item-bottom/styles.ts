/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:58:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:58:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
