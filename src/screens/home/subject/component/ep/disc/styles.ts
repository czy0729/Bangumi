/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:33:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 08:14:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 96,
    paddingHorizontal: _.wind,
    marginTop: _.lg
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
