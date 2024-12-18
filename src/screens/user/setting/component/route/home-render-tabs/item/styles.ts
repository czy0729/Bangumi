/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-18 09:43:27
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
    top: 5,
    bottom: 4,
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
