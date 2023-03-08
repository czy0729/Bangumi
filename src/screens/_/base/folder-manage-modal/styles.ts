/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:38:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-07 19:04:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.r(408),
    backgroundColor: _.select(_.colorBg, _.colorBg),
    borderRadius: _.radiusMd
  },
  scrollView: {
    height: _.window.height * 0.7,
    marginTop: _.md,
    marginBottom: _.sm
  },
  list: {
    paddingBottom: _.window.height * 0.5
  },
  create: {
    position: 'absolute',
    zIndex: 1,
    top: -31,
    right: 12
  }
}))
