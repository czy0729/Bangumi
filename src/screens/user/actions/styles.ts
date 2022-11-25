/*
 * @Author: czy0729
 * @Date: 2022-11-23 10:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 05:31:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.window.height / 2
  }
}))
