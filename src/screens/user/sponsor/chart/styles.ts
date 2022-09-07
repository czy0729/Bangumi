/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-07 03:45:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    height: 56
  },
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  refresh: {
    marginRight: -24
  }
}))
