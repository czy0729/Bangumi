/*
 * @Author: czy0729
 * @Date: 2022-05-03 21:13:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 05:07:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  border: {
    borderWidth: 1,
    borderColor: _.colorBorder
  },
  shadow: _.shadow,
  shadowLg: {
    shadowColor: _.colorShadow,
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 16
  },
  placeholder: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  error: {
    maxWidth: '100%',
    padding: 4
  },
  errorIcon: {
    opacity: _.select(0.5, 0.3)
  },
  textOnly: {
    marginTop: -8
  }
}))
