/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 15:59:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tab: {
    paddingVertical: 12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  disabledLine: {
    position: 'absolute',
    zIndex: 1,
    top: '49%',
    right: 10,
    left: 10,
    height: 2,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    opacity: 0.8
  }
}))
