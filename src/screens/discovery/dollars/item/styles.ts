/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:24:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 18:12:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 12
  },
  inView: {
    minWidth: 52,
    minHeight: 52
  },
  avatar: {
    width: 68,
    marginLeft: -8
  },
  content: {
    padding: 15,
    paddingTop: 12,
    marginTop: -1,
    marginLeft: 8,
    borderWidth: 5,
    borderRadius: _.radiusMd,
    borderColor: 'rgba(255, 255, 255, 0.88)'
  },
  moreStyle: {}
}))
