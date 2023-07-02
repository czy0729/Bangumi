/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:24:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:40:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.window.height / 2
  }
}))
