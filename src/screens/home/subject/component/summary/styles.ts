/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:31:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-05 21:42:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 229,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind,
    marginTop: -_.sm
  },
  containerNotShow: {
    minHeight: 'auto'
  },
  content: {
    paddingBottom: _.lg
  }
}))
