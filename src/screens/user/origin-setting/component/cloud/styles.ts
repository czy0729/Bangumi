/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:15:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 16:06:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.select(0, _.md),
    paddingVertical: _.select(0, _.md),
    marginBottom: _.md,
    backgroundColor: _.select('transparent', _.colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  item: {
    paddingLeft: 0
  },
  content: {
    paddingRight: 0
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1)
      }
    ]
  }
}))
