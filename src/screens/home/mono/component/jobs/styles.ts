/*
 * @Author: czy0729
 * @Date: 2022-07-20 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:06:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    paddingTop: 2,
    paddingLeft: _.sm + 4
  },
  bottom: {
    maxWidth: '80%',
    marginLeft: _.xs
  },
  castCover: {
    marginRight: _.xs,
    marginLeft: _.md
  }
}))
