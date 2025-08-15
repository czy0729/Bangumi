/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:31:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:26:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 210,
    paddingHorizontal: _.wind,
    marginTop: _.sm
  },
  hide: {
    paddingHorizontal: _.wind,
    marginTop: _.sm,
    marginBottom: -_.sm
  }
}))
