/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:53:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 16:10:17
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
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  }
}))
