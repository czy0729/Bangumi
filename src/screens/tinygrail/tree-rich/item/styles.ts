/*
 * @Author: czy0729
 * @Date: 2022-11-11 02:20:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 02:20:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    position: 'absolute',
    borderWidth: _.tSelect(1, _.hairlineWidth),
    borderColor: _.colorTinygrailBorder,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
