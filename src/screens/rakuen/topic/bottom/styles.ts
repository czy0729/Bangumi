/*
 * @Author: czy0729
 * @Date: 2022-09-28 16:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 16:06:18
 */
import { _ } from '@stores'
import { IOS } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  fixedBottom: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    marginBottom: -4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ...(IOS
      ? {
          paddingBottom: 32,
          shadowColor: _.colorShadow,
          shadowOffset: {
            width: 1,
            height: -2
          },
          shadowOpacity: 0.06,
          shadowRadius: 6
        }
      : {
          elevation: 8
        })
  },
  fixedLeft: {
    position: 'absolute',
    zIndex: 1002,
    left: 0,
    bottom: 0,
    paddingRight: _.md
  },
  fixedCenter: {
    position: 'absolute',
    zIndex: 1001,
    left: _.window.width / 3,
    bottom: 0
  },
  fixedRight: {
    position: 'absolute',
    zIndex: 1002,
    right: 0,
    bottom: 0
  },
  btn: {
    width: _.window.width / 3,
    height: 64,
    paddingBottom: 16
  }
}))
