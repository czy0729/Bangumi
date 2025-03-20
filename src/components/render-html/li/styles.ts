/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 22:00:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  li: {
    marginTop: 0,
    marginBottom: 12,
    borderBottomWidth: 0
  },
  groupSection: {
    paddingTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 6,
    marginTop: _.sm,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
