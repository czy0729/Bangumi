/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:21:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 17:40:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 146,
    marginTop: _.lg,
    marginHorizontal: _.wind
  },
  input: {
    width: _.r(74),
    height: _.r(32)
  },
  inputRaw: {
    height: _.r(32),
    paddingVertical: 0,
    paddingHorizontal: _.sm,
    color: _.colorSub,
    fontWeight: '800',
    ..._.device(_.fontSize12, _.fontSize15)
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: _.device(9, 5),
    right: 10
  },
  btn: {
    width: _.r(44),
    height: _.r(32),
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    overflow: 'hidden'
  },
  btnOnAir: {
    width: _.r(44),
    height: _.r(32),
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderRadius: _.radiusXs,
    overflow: _.ios(undefined, 'hidden')
  },
  btnReset: {
    height: _.r(32),
    marginTop: -8
  }
}))
