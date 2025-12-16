/*
 * @Author: czy0729
 * @Date: 2025-12-14 17:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 02:21:02
 */
import { _ } from '@stores'
import { LINE_HEIGHT } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  horizontal: {
    position: 'absolute',
    height: _.select(1.5, 1),
    backgroundColor: _.select('rgba(0, 0, 0, 0.36)', '#555')
  },
  vertical: {
    position: 'absolute',
    width: _.select(1.5, 1),
    backgroundColor: _.select('rgba(0, 0, 0, 0.36)', '#555')
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
    opacity: _.select(1, 0.8)
  },
  override: {
    fontFamily: ''
  }
}))
