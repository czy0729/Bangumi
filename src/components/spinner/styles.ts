/*
 * @Author: czy0729
 * @Date: 2022-08-16 12:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 14:23:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    backgroundColor: _.colorSub,
    borderRadius: 20,
    overflow: 'hidden',
    opacity: _.select(0.56, 0.92)
  },
  circlePlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden'
  },
  squrePlaceholder: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    width: '50%'
  },
  image: {
    width: 36,
    height: 36,
    opacity: 0.5
  }
}))
