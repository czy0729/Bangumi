/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:27:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    zIndex: 1,
    paddingVertical: _.sm,
    paddingHorizontal: _._wind
  }
}))
