/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 12:43:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth),
    marginTop: -_.window.height * 0.22,
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
    width: 60
  },
  segmentedControl: {
    width: 144,
    height: 30
  },
  input: {
    height: 36,
    paddingVertical: 0,
    paddingRight: 32,
    paddingLeft: 0,
    ..._.fontSize12,
    backgroundColor: 'transparent'
  },
  inputMultiline: {
    height: 100
  },
  multilineInputStyle: {
    ..._.fontSize12
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
