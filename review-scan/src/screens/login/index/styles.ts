/*
 * @Author: czy0729
 * @Date: 2022-09-02 17:19:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-02 17:19:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottomContainer: {
    width: _.r(320),
    height: 400
  },
  loading: {
    width: _.r(320),
    height: 64
  }
}))
