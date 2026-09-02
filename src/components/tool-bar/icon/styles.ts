/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
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
