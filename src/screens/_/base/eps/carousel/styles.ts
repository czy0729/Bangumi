/*
 * @Author: czy0729
 * @Date: 2022-05-26 04:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-26 04:28:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  carousel: {
    height: 242
  },
  dot: {
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.colorDesc
  },
  dotActive: {
    backgroundColor: _.colorDesc
  }
}))
