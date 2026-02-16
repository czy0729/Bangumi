/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:26:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 20:37:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: _.window.height * 0.32
  }
}))
