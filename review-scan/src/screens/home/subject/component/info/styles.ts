/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:53:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 16:51:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 210,
    marginTop: _.lg
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
