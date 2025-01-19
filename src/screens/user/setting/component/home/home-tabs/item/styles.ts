/*
 * @Author: czy0729
 * @Date: 2024-07-10 10:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-18 16:25:56
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
    top: 9,
    bottom: 9,
    left: '46%',
    width: 3,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    transform: [
      {
        rotate: '45deg'
      }
    ]
  }
}))
