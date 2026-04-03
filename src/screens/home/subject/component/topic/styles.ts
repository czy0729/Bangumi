/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:44:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 148,
    marginTop: 24
  },
  containerFull: {
    minHeight: 246
  },
  containerNotShow: {
    minHeight: 'auto'
  },
  item: {
    paddingLeft: _.wind
  }
}))
