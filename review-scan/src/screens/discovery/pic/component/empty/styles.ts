/*
 * @Author: czy0729
 * @Date: 2025-06-10 17:47:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 22:12:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: _.window.height - _.headerHeight - 40
  }
}))
