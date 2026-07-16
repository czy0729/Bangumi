/*
 * @Author: czy0729
 * @Date: 2023-12-11 19:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:26:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginHorizontal: _.device(0, -_.wind)
  }
}))
