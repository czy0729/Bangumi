/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-10 05:51:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  topLine: {
    height: _.r(32),
    backgroundColor: _.colorPlain,
    borderTopLeftRadius: _.radiusLg,
    borderTopRightRadius: _.radiusLg
  },
  content: {
    paddingRight: _.wind,
    paddingBottom: 20,
    marginTop: -_.r(20),
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  release: {
    position: 'absolute',
    zIndex: 1,
    top: _.r(28),
    opacity: 0.6
  },
  katakana: {
    marginTop: -4
  },
  duration: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
