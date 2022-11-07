/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:06:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 14:06:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  back: {
    marginLeft: -8
  },
  avatar: {
    marginLeft: _.xs,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  touch: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
