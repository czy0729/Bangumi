/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:17:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-22 02:28:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  body: {
    marginTop: -1,
    marginLeft: _.md
  },
  tag: {
    paddingRight: 6,
    paddingLeft: 6,
    marginRight: _.sm,
    marginBottom: _.sm
  }
}))
