/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:28:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm,
    width: _.isLandscape ? '33%' : '50%'
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  },
  expand: {
    paddingVertical: _.sm
  },
  rank: {
    minWidth: 24
  }
}))
