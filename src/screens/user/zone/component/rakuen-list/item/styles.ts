/*
 * @Author: czy0729
 * @Date: 2022-10-22 10:28:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 10:29:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  }
}))
