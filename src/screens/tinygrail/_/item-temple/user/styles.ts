/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:26:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:31:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  fixed: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: 36,
    height: 36,
    marginTop: -38,
    marginLeft: -6
  },
  avatar: {
    padding: 2,
    borderRadius: 10,
    overflow: 'hidden'
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  }
}))
