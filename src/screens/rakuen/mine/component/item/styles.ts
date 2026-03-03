/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-04 00:00:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '50%',
    paddingVertical: _.sm + 4,
    paddingRight: _.sm,
    paddingLeft: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  body: {
    height: _.r(40)
  }
}))
