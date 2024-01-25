/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:57:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-23 19:57:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  direct: {
    position: 'absolute',
    top: -_.sm - 1,
    right: 0,
    bottom: -_.sm,
    left: -_._wind + 4,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
