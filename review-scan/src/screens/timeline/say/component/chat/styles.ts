/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:28:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-17 11:46:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.bottom + _.lg,
    paddingHorizontal: _.wind,
    paddingBottom: _.lg
  }
}))
