/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:01:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm,
    width: _.isLandscape ? '33%' : '50%'
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  }
}))
