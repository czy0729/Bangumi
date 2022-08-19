/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 05:59:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  desc: {
    marginTop: _.xs,
    marginRight: _.lg
  }
}))
