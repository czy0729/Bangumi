/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 03:10:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    marginTop: _.sm
  },
  notice: {
    height: 40,
    marginTop: _.sm
  }
}))
