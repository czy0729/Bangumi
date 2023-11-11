/*
 * @Author: czy0729
 * @Date: 2022-05-03 17:47:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 22:22:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: Number(_.window.width * 0.48),
    maxWidth: _.device(240, 280),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
  },
  title: {
    width: '100%',
    paddingVertical: _.r(12),
    paddingHorizontal: _.r(24)
  },
  item: {
    width: '100%',
    paddingVertical: _.r(12),
    paddingHorizontal: _.r(24)
  },
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  }
}))
