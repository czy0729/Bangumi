/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:07:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:20:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    opacity: _.select(1, 0.8)
  },
  new: {
    width: 3,
    height: 9,
    marginRight: 6,
    marginTop: 1,
    backgroundColor: _.colorMain,
    borderRadius: 1
  }
}))
