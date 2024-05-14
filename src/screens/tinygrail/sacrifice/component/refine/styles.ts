/*
 * @Author: czy0729
 * @Date: 2024-03-11 18:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-12 07:40:18
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
