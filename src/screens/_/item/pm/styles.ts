/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:43:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  inView: {
    minWidth: 40,
    minHeight: 40
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    marginLeft: _.sm
  }
}))
