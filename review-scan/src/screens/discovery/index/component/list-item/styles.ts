/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:51:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-09 21:51:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingVertical: _.md + 4,
    paddingRight: _.windSm - _._wind,
    paddingLeft: _.windSm
  },
  contentContainerStyleSm: {
    paddingRight: _.windSm - _._wind,
    paddingBottom: _.md + 4,
    paddingLeft: _.windSm
  }
}))
