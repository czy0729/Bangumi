/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:53:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  info: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  settings: {
    paddingRight: _.sm,
    marginVertical: 80,
    opacity: 0.5
  }
}))
