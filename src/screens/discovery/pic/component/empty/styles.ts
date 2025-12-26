/*
 * @Author: czy0729
 * @Date: 2025-06-10 17:47:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:36:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height - 120
  }
}))
