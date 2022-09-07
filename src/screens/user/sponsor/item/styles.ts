/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 18:47:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    position: 'absolute'
  },
  body: {
    flex: 1
  },
  border: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  content: {
    width: '88%'
  },
  dot: {
    width: 4,
    height: 4,
    marginRight: _.xs,
    borderRadius: 2
  },
  dot5: {
    width: 6,
    height: 6,
    backgroundColor: _.colorYellow,
    borderRadius: 3
  },
  dot4: {
    width: 6,
    height: 6,
    backgroundColor: _.colorMain,
    borderRadius: 3
  },
  dot3: {
    width: 5,
    height: 5,
    backgroundColor: _.colorPrimary,
    borderRadius: 2.5
  },
  dot2: {
    backgroundColor: _.colorSuccess
  },
  dot1: {
    backgroundColor: _.colorSub
  }
}))
