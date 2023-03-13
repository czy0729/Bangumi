/*
 * @Author: czy0729
 * @Date: 2023-03-13 02:55:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 03:00:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  line: {
    height: 1,
    marginVertical: _.md,
    marginHorizontal: _._wind,
    backgroundColor: _.colorMain
  }
}))
