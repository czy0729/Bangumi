/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 12:24:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0
  },
  wrap: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4
  },
  book: {
    backgroundColor: _.select(_.colorIcon, _._colorDarkModeLevel2)
  },
  line: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 4,
    bottom: 0,
    borderColor: 'rgba(80, 80, 80, 0.4)',
    borderWidth: _.hairlineWidth
  }
}))
