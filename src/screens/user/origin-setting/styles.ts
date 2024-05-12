/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:24:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-13 00:02:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  hd: {
    marginVertical: _.sm
  },
  scrollView: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.window.height / 3
  },
  ft: {
    marginVertical: _.lg
  }
}))
