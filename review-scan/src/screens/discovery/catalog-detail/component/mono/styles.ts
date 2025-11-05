/*
 * @Author: czy0729
 * @Date: 2025-01-07 17:15:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-07 17:42:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorPlain
  },
  inView: {
    minWidth: 64,
    minHeight: 64
  },
  content: {
    marginLeft: 12
  },
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
