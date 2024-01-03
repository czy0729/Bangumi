/*
 * @Author: czy0729
 * @Date: 2023-01-17 05:59:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:53:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.xs,
    marginTop: _.lg
  },
  hide: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginVertical: -_.sm
  }
}))
