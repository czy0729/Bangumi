/*
 * @Author: czy0729
 * @Date: 2022-09-01 13:50:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-01 13:50:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.height
  },
  pagination: {
    marginTop: _.xs,
    marginBottom: _.ios(_.md + _.sm, _.md)
  }
}))
