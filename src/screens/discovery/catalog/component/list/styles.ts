/*
 * @Author: czy0729
 * @Date: 2022-09-06 19:24:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:38:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: Math.floor(_.window.height * 0.64),
    marginBottom: _.md
  }
}))
