/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 07:36:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    height: 104
  },
  gameContainer: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel2)
  },
  gameBody: {
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  gameAngle: {
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  musicAngle: {
    marginRight: -4
  },
  speech: {
    width: '92%',
    marginTop: _.sm
  },
  fontBlock: {
    marginTop: _.sm,
    marginRight: -_._wind
  },
  fontScroll: {
    paddingRight: _._wind
  },
  fontStyle: {
    marginTop: _.sm - 2,
    fontFamily: 'rhrm',
    fontWeight: 'normal'
  },
  fontStyleBold: {
    marginTop: _.sm - 2,
    fontFamily: 'rhrb',
    fontWeight: 'normal'
  },
  fontStyleCustom: {
    marginTop: _.sm - 2,
    fontFamily: '',
    fontWeight: 'normal'
  },
  fontStyleBoldCustom: {
    marginTop: _.sm - 2,
    fontFamily: '',
    fontWeight: 'bold'
  }
}))
