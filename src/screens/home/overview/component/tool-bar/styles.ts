/*
 * @Author: czy0729
 * @Date: 2025-12-05 08:02:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-07 04:42:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  toolBar: {
    paddingTop: _.headerHeight + _.xs,
    paddingBottom: _.sm,
    marginBottom: _.sm
  }
}))
