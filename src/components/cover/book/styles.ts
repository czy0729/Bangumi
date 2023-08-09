/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:23:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
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
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth
  },
  radius: {
    borderTopRightRadius: _.radiusXs,
    borderBottomRightRadius: _.radiusXs,
    borderTopLeftRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusSm
  },
  line: {
    position: 'absolute',
    zIndex: 3,
    top: 1,
    left: 5,
    bottom: 1,
    borderColor: 'rgba(80, 80, 80, 0.4)',
    borderWidth: _.hairlineWidth
  }
}))
