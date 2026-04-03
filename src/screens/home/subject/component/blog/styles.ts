/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:38:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 156,
    marginTop: 28
  },
  containerFull: {
    minHeight: 246
  },
  containerNotShow: {
    minHeight: 'auto'
  },
  sectionTitle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingLeft: _.wind
  }
}))
