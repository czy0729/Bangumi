/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-17 06:32:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  blockText: {
    color: _.select(_.colorDesc, _._colorDarkModeLevel2),
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel2)
  },
  blockTextShow: {
    color: _.colorPlain,
    backgroundColor: _.colorDesc
  }
}))
