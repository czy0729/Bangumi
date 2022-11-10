/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:47:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:47:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  info: {
    paddingBottom: _.sm
  },
  notice: {
    height: 64
  },
  item: {
    paddingVertical: _.sm,
    borderBottomColor: _.colorTinygrailBorder,
    borderBottomWidth: _.hairlineWidth
  },
  time: {
    width: 96
  }
}))
