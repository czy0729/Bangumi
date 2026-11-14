/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  ipt: {
    height: 44,
    paddingHorizontal: 14,
    paddingVertical: 0,
    color: _.colorDesc,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 2,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
