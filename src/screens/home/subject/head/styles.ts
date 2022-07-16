/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:35:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-16 11:35:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    zIndex: 1,
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
  title: {
    minHeight: 90
  },
  katakana: {
    marginTop: -11
  },
  series: {
    width: 168,
    paddingRight: _.sm,
    marginTop: _.sm
  },
  release: {
    position: 'absolute',
    zIndex: 1,
    top: _.r(28),
    opacity: 0.6
  }
}))
