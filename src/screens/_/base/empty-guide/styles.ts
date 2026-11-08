/*
 * @Author: czy0729
 * @Date: 2026-11-08 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 10:00:00
 *
 * EmptyGuide 样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    flex: 1,
    paddingHorizontal: _.wind
  },
  button: {
    width: 160,
    height: _.r(28),
    marginTop: _.lg,
    borderRadius: _.r(28),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}))
