/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:32:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 18:32:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
