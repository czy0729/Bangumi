/*
 * @Author: czy0729
 * @Date: 2025-05-02 19:59:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-05-02 19:59:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btn: {
    width: 80,
    height: 28,
    marginLeft: _.sm,
    borderRadius: 0
  },
  disabled: {
    width: 80,
    height: 28,
    marginLeft: _.sm,
    opacity: 0.5,
    borderRadius: 0
  },
  text: {
    ..._.fontSize(11)
  }
}))
