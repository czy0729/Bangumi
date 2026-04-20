/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 16:14:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tab: {
    paddingTop: _.sm + 2,
    paddingBottom: _.sm + 4,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  icon: {
    height: 24
  },
  disabledLine: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    right: 12,
    left: 12,
    height: 2,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    opacity: 0.8
  }
}))
