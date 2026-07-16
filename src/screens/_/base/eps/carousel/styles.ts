/*
 * @Author: czy0729
 * @Date: 2022-05-26 04:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:30:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  carousel: {
    height: 232
  },
  dot: {
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.colorDesc
  },
  dotActive: {
    backgroundColor: _.colorDesc
  }
}))

export const paginationStyles = _.create({
  // eslint-disable-next-line bangumi/no-unused-style-key
  pagination: {
    marginLeft: -10
  }
})
