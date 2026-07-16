/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:26:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:45:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: Math.floor(_.window.height * 0.32)
  }
}))
