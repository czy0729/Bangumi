/*
 * @Author: czy0729
 * @Date: 2022-05-26 04:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-20 07:41:42
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
  pagination: {
    marginLeft: -10
  }
})
