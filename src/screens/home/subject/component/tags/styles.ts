/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:34:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 05:49:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 96
  },
  tags: {
    minHeight: 64,
    paddingHorizontal: _.wind,
    marginTop: 22
  },
  more: {
    paddingVertical: _.md,
    paddingHorizontal: 100,
    marginTop: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  split: {
    marginTop: 0,
    marginBottom: 24
  }
}))
