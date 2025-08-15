/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:13:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-14 15:13:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  section: {
    paddingVertical: _.sm + _.xs,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  }
}))
