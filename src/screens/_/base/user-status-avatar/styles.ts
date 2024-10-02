/*
 * @Author: czy0729
 * @Date: 2024-10-01 17:33:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 17:42:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  favor: {
    position: 'absolute',
    zIndex: 1,
    right: -6,
    bottom: -2,
    paddingTop: 1,
    paddingRight: 2,
    paddingBottom: 1,
    paddingLeft: 1,
    backgroundColor: _.colorPlain,
    borderRadius: _.web(12, 4),
    overflow: 'hidden',
    pointerEvent: 'none'
  }
}))
