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
    top: 10,
    bottom: 10,
    left: '46%',
    width: 5,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    transform: [
      {
        rotate: '45deg'
      }
    ]
  }
}))
