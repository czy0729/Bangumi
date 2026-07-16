/*
 * @Author: czy0729
 * @Date: 2026-05-05 05:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:20:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: Math.floor(_.window.height * 0.5)
  }
}))
