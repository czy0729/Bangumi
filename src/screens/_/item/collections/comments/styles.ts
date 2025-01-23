/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:46:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-01-24 05:46:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comments: {
    paddingVertical: _.sm,
    paddingHorizontal: 12,
    marginTop: _.md,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
