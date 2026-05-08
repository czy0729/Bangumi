/*
 * @Author: czy0729
 * @Date: 2025-03-04 15:33:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 00:10:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  }
}))
