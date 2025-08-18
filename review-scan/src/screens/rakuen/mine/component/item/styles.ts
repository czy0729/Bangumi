/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:29:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:29:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '50%',
    paddingVertical: _.sm + 4,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  body: {
    height: _.r(40)
  }
}))
