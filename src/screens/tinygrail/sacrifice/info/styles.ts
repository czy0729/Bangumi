/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:31:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:31:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.md
  }
}))
