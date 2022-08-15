/*
 * @Author: czy0729
 * @Date: 2022-06-12 15:58:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 04:27:07
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
  disc: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginRight: -8,
    backgroundColor: _.select(_.colorTitle, _.colorSub)
  },
  book: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginRight: -5,
    backgroundColor: _.select(_.colorIcon, _._colorDarkModeLevel2),
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth,
    borderRadius: 7
  },
  bookLine: {
    position: 'absolute',
    zIndex: 3,
    top: 1,
    left: 4,
    bottom: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: _.hairlineWidth
  },
  bookMarginRight: {
    marginRight: 4
  },
  bookRadius: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  game: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderWidth: 5,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 16
  },
  gameHead: {
    width: 24,
    height: 2,
    marginBottom: 2,
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  },
  gameAngle: {
    width: 6,
    height: 4,
    marginTop: 2,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  },
  catalog: {
    position: 'absolute',
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: 1,
    borderRadius: _.radiusXs,
    borderColor: _.colorBorder
  },
  catalogLevel1: {
    zIndex: 2,
    top: 2,
    bottom: 2,
    marginRight: -4
  },
  catalogLevel2: {
    zIndex: 1,
    top: 4,
    bottom: 4,
    marginRight: -8
  },
  textOnly: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  textOnlyRadius: {
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
