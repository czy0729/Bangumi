/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:46:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  direct: {
    position: 'absolute',
    top: -12,
    right: 0,
    bottom: -12,
    left: -_._wind,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
