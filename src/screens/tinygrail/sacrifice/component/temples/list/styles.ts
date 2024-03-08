/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 16:03:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  temples: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind - _._wind
  }
}))
