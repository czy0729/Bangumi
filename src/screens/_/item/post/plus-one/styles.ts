/*
 * @Author: czy0729
 * @Date: 2022-10-13 05:11:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:30:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    marginBottom: _.sm
  },
  round: {
    padding: 4,
    paddingRight: 12,
    backgroundColor: _.colorBg,
    borderRadius: 16
  },
  rectangle: {
    padding: 4,
    paddingRight: 8,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  },
  direct: {
    position: 'absolute',
    top: -10,
    right: -12,
    bottom: -10,
    left: -12,
    borderWidth: 2,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
