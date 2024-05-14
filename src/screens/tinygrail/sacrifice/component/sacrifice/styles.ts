/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:38:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:24:40
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
