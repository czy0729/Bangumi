/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:36:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 17:24:38
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
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  favor: {
    marginTop: 1
  }
}))
