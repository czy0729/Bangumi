/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:54:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120,
    marginTop: _.lg
  },
  item: {
    paddingLeft: _.wind
  }
}))
