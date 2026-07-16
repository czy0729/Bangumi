/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:45:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:49:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    flex: 1,
    marginTop: Math.floor(_.window.height / 3),
    backgroundColor: _.colorPlain
  }
}))
