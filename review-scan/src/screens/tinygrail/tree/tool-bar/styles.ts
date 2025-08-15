/*
 * @Author: czy0729
 * @Date: 2022-11-11 00:54:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 00:54:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: _.r(44),
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingVertical: _.md - 4,
    paddingHorizontal: _.md
  },
  touchable: {
    paddingHorizontal: _.lg
  }
}))
