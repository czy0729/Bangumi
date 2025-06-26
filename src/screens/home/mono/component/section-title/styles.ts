/*
 * @Author: czy0729
 * @Date: 2024-08-16 05:08:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 05:13:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  touch: {
    paddingLeft: _.xs,
    marginRight: _.web(-_.xs, -_.sm),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  opacity: {
    opacity: 0.64
  }
}))
