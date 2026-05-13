/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:42:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:00:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  section: {
    marginTop: _.xs,
    marginLeft: _.wind
  },
  bid: {
    backgroundColor: _.colorDepthBid
  },
  ask: {
    backgroundColor: _.colorDepthAsk
  }
}))
