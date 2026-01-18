/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:22:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 20:22:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    width: (_.windowSm.width - 2 * _.windSm) * 0.249,
    height: (_.windowSm.width - 2 * _.windSm) * 0.249,
    paddingVertical: _.sm + 4
  },
  wrapSm: {
    width: (_.windowSm.width - 2 * _.windSm) * 0.198,
    paddingVertical: _.sm + 4
  },
  item: {
    width: (_.windowSm.width - 2 * _.windSm) / 4
  },
  itemSm: {
    width: (_.windowSm.width - 2 * _.windSm) / 5
  },
  split: {
    width: 3,
    height: 28,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel2),
    borderRadius: 2
  },
  disabled: {
    opacity: 0.4
  }
}))
