/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 14:07:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.r(48),
    marginTop: _.ios(80, -80)
  },
  content: {
    paddingTop: _.r(12),
    paddingRight: _.wind,
    paddingBottom: 20,
    backgroundColor: _.colorPlain,
    borderTopLeftRadius: _.radiusLg,
    borderTopRightRadius: _.radiusLg
  },
  release: {
    position: 'absolute',
    zIndex: 1,
    top: _.r(28),
    opacity: 0.6
  },
  katakana: {
    marginTop: -4
  }
}))
