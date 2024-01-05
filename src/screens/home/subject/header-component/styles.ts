/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 17:50:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    backgroundColor: _.colorPlain
  },
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg
  }
}))
