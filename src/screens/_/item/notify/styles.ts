/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:38:47
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
  inView: {
    minWidth: 40,
    minHeight: 40
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    marginLeft: _.sm
  },
  desc: {
    marginTop: _.xs
  },
  tag: {
    width: 40,
    marginTop: 5
  }
}))
