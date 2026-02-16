/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:06:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 19:47:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  back: {
    marginLeft: -8,
    marginRight: _.xs
  },
  touch: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
