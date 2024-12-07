/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:41:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 17:04:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: _.portrait('50%', '33%'),
    paddingVertical: _.sm + 2
  },
  comment: {
    padding: _.sm,
    marginTop: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
