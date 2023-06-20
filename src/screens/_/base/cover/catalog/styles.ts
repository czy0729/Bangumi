/*
 * @Author: czy0729
 * @Date: 2023-06-20 12:24:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:24:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0
  },
  catalog: {
    position: 'absolute',
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: 1,
    borderRadius: _.radiusXs,
    borderColor: _.colorBorder
  },
  catalogLevel1: {
    zIndex: 2,
    top: 2,
    bottom: 2,
    marginRight: -4
  },
  catalogLevel2: {
    zIndex: 1,
    top: 4,
    bottom: 4,
    marginRight: -8
  }
}))
