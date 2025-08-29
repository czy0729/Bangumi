/*
 * @Author: czy0729
 * @Date: 2022-08-01 17:52:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-01 17:52:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  split: {
    marginTop: _.md,
    marginBottom: _.sm,
    borderTopWidth: 16,
    borderColor: _.colorBorder
  }
}))
