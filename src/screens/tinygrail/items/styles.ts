/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:35:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
