/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 19:59:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.r(320),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  content: {
    paddingHorizontal: _.sm
  },
  avatars: {
    minHeight: _.r(40),
    paddingVertical: _.sm,
    marginTop: _.sm
  },
  names: {
    height: _.r(240),
    paddingVertical: _.sm
  },
  item: {
    paddingVertical: _.sm
  },
  date: {
    width: _.r(80)
  },
  empty: {
    marginTop: -_.md,
    height: '100%'
  }
}))
