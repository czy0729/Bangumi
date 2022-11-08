/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:52:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 18:52:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    width: '47%',
    paddingVertical: _.sm,
    paddingRight: _.md,
    marginRight: '3%'
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    minWidth: 24
  }
}))
