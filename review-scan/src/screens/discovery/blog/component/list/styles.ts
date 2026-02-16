/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:50:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 05:43:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height * 0.75
  }
}))
