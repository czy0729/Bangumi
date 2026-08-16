/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:27:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1110,
    right: 0,
    bottom: 20,
    left: 0,
    paddingRight: _.wind,
    paddingLeft: _.wind - _._wind + _.sm
  },
  mask: {
    zIndex: 1100
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginTop: -1,
    borderWidth: 5,
    borderRadius: _.radiusMd,
    borderColor: _.select('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.88)')
  }
}))