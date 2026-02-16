/*
 * @Author: czy0729
 * @Date: 2022-06-15 13:45:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-15 13:45:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dot: {
    position: 'absolute',
    zIndex: 2,
    top: _.device(6, 8),
    left: _.device(25, 32),
    width: 12,
    height: 12,
    backgroundColor: _.colorMain,
    borderWidth: 2,
    borderColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 16
  }
}))
