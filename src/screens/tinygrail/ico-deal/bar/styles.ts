/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:27:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 18:27:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  ico: {
    height: 24
  },
  icoBar: {
    width: '100%',
    height: 24,
    backgroundColor: _.colorBorder,
    borderRadius: 12,
    overflow: 'hidden'
  },
  icoBarDark: {
    backgroundColor: _.colorTinygrailBorder
  },
  icoProcess: {
    height: 24,
    borderRadius: 12,
    overflow: 'hidden'
  },
  iconText: {
    position: 'absolute',
    zIndex: 1,
    top: 3,
    right: _.wind
  }
}))
