/*
 * @Author: czy0729
 * @Date: 2022-10-13 05:11:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-13 05:11:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.sm + 2,
    paddingTop: _.sm
  },
  round: {
    padding: 4,
    paddingRight: 12,
    backgroundColor: _.colorBg,
    borderRadius: 16
  },
  rectangle: {
    padding: 4,
    paddingRight: 8,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  }
}))
