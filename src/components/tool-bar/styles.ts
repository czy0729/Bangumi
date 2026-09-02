/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:26:05
 */
import { _ } from '@stores'

/** ToolBar 与 Touchable / Popover 共享样式 */
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
  }
}))
