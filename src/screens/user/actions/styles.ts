/*
 * @Author: czy0729
 * @Date: 2022-11-23 10:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:07:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.window.height / 2
  }
}))
