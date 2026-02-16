/*
 * @Author: czy0729
 * @Date: 2022-09-28 16:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-17 21:18:33
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
    height: _.ios(32, 'auto'),
    paddingVertical: 16,
    paddingHorizontal: _.wind,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ...(IOS
      ? {
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
  }
}))
