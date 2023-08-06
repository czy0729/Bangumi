/*
 * @Author: czy0729
 * @Date: 2023-08-01 05:46:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-08-01 05:46:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginLeft: -_.sm
  }
}))
