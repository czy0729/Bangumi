/*
 * @Author: czy0729
 * @Date: 2022-06-13 21:11:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:03:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tag: {
    minWidth: _.r(28),
    minHeight: _.r(16),
    paddingRight: 2,
    paddingVertical: 1,
    paddingLeft: 1,
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs
  },
  fix: {
    paddingRight: 4,
    paddingLeft: 4
  },
  main: {
    backgroundColor: _.select(_.colorMainLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorMainBorder, _._colorDarkModeLevel1)
  },
  primary: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  success: {
    backgroundColor: _.select(_.colorSuccessLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorSuccessBorder, _._colorDarkModeLevel1)
  },
  warning: {
    backgroundColor: _.select(_.colorWarningLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorWarningBorder, _._colorDarkModeLevel1)
  },
  danger: {
    backgroundColor: _.select(_.colorWarningLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorWarningBorder, _._colorDarkModeLevel1)
  },
  plain: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  title: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  mainActive: {
    backgroundColor: _.colorMain,
    borderColor: _.colorMain
  },
  warningActive: {
    backgroundColor: _.colorWarning,
    borderColor: _.colorWarning
  },
  primaryActive: {
    backgroundColor: _.colorPrimary,
    borderColor: _.colorPrimary
  },
  waitActive: {
    backgroundColor: _.colorWait,
    borderColor: _.colorWait
  }
}))
