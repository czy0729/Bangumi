/*
 * @Author: czy0729
 * @Date: 2024-11-29 09:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:18:17
 */
import { _ } from '@stores'

export const styles = _.create({
  dev: {
    position: 'absolute',
    zIndex: 100,
    top: _.sm,
    left: _.sm,
    pointerEvents: 'none'
  },
  devText: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: _.colorWarning,
    borderRadius: 4
  }
})
