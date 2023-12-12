/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:23:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0
  },
  book: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4,
    backgroundColor: _.select(_.colorIcon, _._colorDarkModeLevel2),
    borderRadius: _.radiusXs
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
