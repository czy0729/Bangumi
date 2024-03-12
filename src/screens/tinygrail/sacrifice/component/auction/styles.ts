/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:25:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md,
    marginTop: _.sm,
    backgroundColor: _.colorTinygrailBg
  }
}))
