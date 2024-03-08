/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 21:33:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginTop: _.sm,
    backgroundColor: _.colorTinygrailBg
  }
}))
