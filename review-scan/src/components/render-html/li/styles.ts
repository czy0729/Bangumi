/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 18:00:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  li: {
    marginTop: 0,
    marginBottom: 12,
    borderBottomWidth: 0
  },
  groupSection: {
    paddingTop: 6,
    paddingRight: 16,
    paddingLeft: 8,
    paddingBottom: 8,
    marginTop: _.sm,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderLeftWidth: 5,
    borderLeftColor: _.colorBorder,
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
