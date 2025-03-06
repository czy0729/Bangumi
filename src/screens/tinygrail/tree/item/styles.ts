/*
 * @Author: czy0729
 * @Date: 2022-11-11 01:45:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 01:45:03
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
