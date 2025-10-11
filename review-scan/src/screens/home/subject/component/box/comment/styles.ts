/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:08:51
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-25 11:08:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comment: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: _.md,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
