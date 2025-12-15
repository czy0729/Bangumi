/*
 * @Author: czy0729
 * @Date: 2025-12-14 17:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-14 18:00:05
 */
import { _ } from '@stores'
import { LINE_HEIGHT } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  horizontal: {
    position: 'absolute',
    height: 1,
    backgroundColor: _.select(_.colorBorder, '#555')
  },
  vertical: {
    position: 'absolute',
    width: 1,
    backgroundColor: _.select(_.colorBorder, '#555')
  },
  active: {
    backgroundColor: _.colorWarning
  },
  touchable: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: -LINE_HEIGHT + 4
  },
  text: {
    opacity: 0.8
  }
}))
