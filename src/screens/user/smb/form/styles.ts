/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-30 06:57:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth),
    marginTop: -_.window.height * 0.2,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  body: {
    paddingHorizontal: 6,
    paddingTop: _.md
  },
  label: {
    width: 64
  },
  input: {
    height: 44,
    paddingVertical: 0,
    paddingRight: 32,
    paddingLeft: 0,
    backgroundColor: 'transparent'
  },
  inputMultiline: {
    height: 120
  },
  touch: {
    marginHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 20,
    marginTop: -20
  }
}))
