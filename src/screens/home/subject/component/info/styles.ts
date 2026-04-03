/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:53:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:46:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 218,
    marginTop: 36
  },
  containerNotShow: {
    minHeight: 'auto'
  },
  hide: {
    marginTop: _.lg,
    marginBottom: -_.sm
  },
  info: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  }
}))
