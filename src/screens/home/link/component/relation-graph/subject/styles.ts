/*
 * @Author: czy0729
 * @Date: 2025-12-14 19:51:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 23:39:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cover: {
    position: 'absolute',
    top: -4,
    right: -4,
    opacity: _.select(0.92, 0.84)
  },
  linear: {
    position: 'absolute',
    top: -1,
    right: -1,
    bottom: -1,
    width: 58
  },
  title: {
    paddingHorizontal: 20
  },
  sub: {
    opacity: _.select(0.88, 0.76)
  },
  override: {
    fontFamily: '',
    fontWeight: 'bold'
  },
  desc: {
    marginTop: 4,
    opacity: _.select(0.88, 0.76)
  }
}))
