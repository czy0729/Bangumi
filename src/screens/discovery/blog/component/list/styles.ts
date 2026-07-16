/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:50:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: Math.floor(_.window.height * 0.75),
    paddingBottom: _.md
  }
}))
