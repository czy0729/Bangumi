/*
 * @Author: czy0729
 * @Date: 2025-07-08 18:19:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 21:03:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  balance: {
    paddingHorizontal: _.wind,
    marginTop: 24,
    marginBottom: 8
  },
  body: {
    paddingVertical: _.xs,
    paddingRight: _.sm,
    paddingLeft: _.md,
    backgroundColor: _.colorTinygrailBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touch: {
    padding: _.sm
  }
}))
