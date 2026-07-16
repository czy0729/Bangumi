/*
 * @Author: czy0729
 * @Date: 2022-08-19 03:16:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:38:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  input: {
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  }
}))
