/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:16:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:16:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  sort: {
    marginRight: -_.sm,
    marginLeft: _.xs
  }
}))
