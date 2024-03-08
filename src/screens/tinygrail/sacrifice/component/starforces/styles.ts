/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 18:38:40
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
