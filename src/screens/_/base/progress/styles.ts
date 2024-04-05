/*
 * @Author: czy0729
 * @Date: 2024-04-03 08:43:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-03 10:12:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  progress: {
    width: '100%',
    paddingRight: _.md,
    paddingBottom: 8
  },
  bar: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
