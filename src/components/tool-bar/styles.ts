/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:30:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-05 19:30:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingTop: _.ios(_.device(6, 10), 0),
    paddingBottom: _.device(10, 16)
  },
  touch: {
    minWidth: 48,
    marginHorizontal: _.xs,
    borderRadius: 24,
    overflow: 'hidden'
  },
  item: {
    minWidth: 48,
    height: _.device(30, 44),
    paddingHorizontal: 12,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  }
}))
