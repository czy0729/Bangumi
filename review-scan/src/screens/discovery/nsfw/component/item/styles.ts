/*
 * @Author: czy0729
 * @Date: 2022-09-11 12:25:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:12:37
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
