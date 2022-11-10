/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:19:51
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 04:19:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    zIndex: 1,
    paddingVertical: _.sm,
    paddingHorizontal: _._wind
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
