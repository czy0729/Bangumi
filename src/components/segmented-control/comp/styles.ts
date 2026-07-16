/*
 * @Author: czy0729
 * @Date: 2022-05-03 11:07:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:32:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  default: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: Math.max(Number(_.window.contentWidth / 1.88), 168),
    height: 36,
    backgroundColor: '#eee',
    borderRadius: _.radiusXs
  },
  slider: {
    position: 'absolute',
    top: 1,
    bottom: 1,
    right: 1,
    left: 1,
    borderRadius: _.radiusXs
  }
}))
