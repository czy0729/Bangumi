/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:33:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:23:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 262,
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  containerShort: {
    minHeight: 'auto'
  },
  item: {
    paddingHorizontal: _.sm,
    paddingVertical: _.sm
  },
  odd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  translate: {
    marginTop: _.xs
  }
}))
