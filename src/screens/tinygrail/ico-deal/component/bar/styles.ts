/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:27:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 00:12:12
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
    right: 0,
    left: 0
  },
  btn: {
    position: 'absolute',
    zIndex: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: -2
  },
  btnAdd: {
    right: 0,
    marginRight: -3
  },
  btnMinus: {
    left: 0,
    marginLeft: -3
  }
}))
