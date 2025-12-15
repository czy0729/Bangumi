/*
 * @Author: czy0729
 * @Date: 2025-12-14 19:51:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-14 20:06:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cover: {
    position: 'absolute',
    top: -4,
    right: -4,
    opacity: 0.8
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
    opacity: 0.64
  },
  override: {
    fontFamily: '',
    fontWeight: 'bold'
  },
  date: {
    marginTop: 3,
    opacity: 0.64
  }
}))
