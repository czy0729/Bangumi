/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 12:50:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingTop: _.ios(_.device(6, 10), 0),
    paddingBottom: 8
  },
  touch: {
    marginHorizontal: 4
  },
  item: {
    minWidth: 32,
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: 28
  },
  opacity: {
    marginRight: -24,
    marginLeft: -8,
    backgroundColor: 'transparent'
  },
  iconTouch: {
    marginHorizontal: _.xs,
    borderRadius: 28,
    overflow: 'hidden'
  },
  iconItem: {
    width: 32,
    height: 30,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: 28
  }
}))
