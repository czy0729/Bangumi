/*
 * @Author: czy0729
 * @Date: 2022-11-11 02:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:21:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    position: 'absolute',
    borderWidth: _.select(_.hairlineWidth, 1),
    borderColor: _.colorTinygrailBorder,
    overflow: 'hidden'
  }
}))
