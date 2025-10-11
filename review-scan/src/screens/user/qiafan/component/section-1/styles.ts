/*
 * @Author: czy0729
 * @Date: 2025-04-04 01:49:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:56:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scroll: {
    marginTop: _.md,
    marginHorizontal: -_.wind
  },
  container: {
    paddingHorizontal: _._wind
  }
}))
