/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:35:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 12:41:17
 */
import { _ } from '@stores'
import { IMG_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  },
  main: {
    padding: _.md,
    backgroundColor: _.select('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.08)'),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  readed: {
    backgroundColor: _.select('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.16)')
  },
  inView: {
    width: IMG_WIDTH,
    marginRight: 12
  },
  content: {
    marginTop: 4,
    letterSpacing: -0.2 + _.letterSpacing,
    opacity: 0.76
  },
  sub: {
    marginTop: 10,
    opacity: 0.76
  }
}))
