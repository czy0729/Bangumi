/*
 * @Author: czy0729
 * @Date: 2022-08-19 10:53:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 10:53:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  form: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  ipt: {
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: _.wind,
    borderRadius: 0
  }
}))
