/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:31:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:46:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 229,
    paddingHorizontal: _.wind,
    marginTop: -_.sm
  },
  containerNotShow: {
    minHeight: 'auto'
  }
}))
