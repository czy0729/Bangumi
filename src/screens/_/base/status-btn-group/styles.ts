/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:21:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 05:18:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  group: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  block: {
    position: 'absolute',
    top: 0,
    height: 44,
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    pointerEvents: 'none'
  },
  btn: {
    height: 44
  }
}))
