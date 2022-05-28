/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 13:06:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingTop: _.ios(_.device(6, 10), 0),
    paddingBottom: _.device(10, 16)
  },
  touch: {
    minWidth: 40,
    marginHorizontal: _.xs,
    borderRadius: 28,
    overflow: 'hidden'
  },
  item: {
    minWidth: 40,
    height: _.device(30, 44),
    paddingHorizontal: 16,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  transparentTouch: {
    minWidth: 40,
    marginRight: -28,
    marginLeft: -6
  },
  transparentItem: {
    backgroundColor: 'transparent'
  }
}))
