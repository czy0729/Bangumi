/*
 * @Author: czy0729
 * @Date: 2022-11-08 18:54:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-31 01:02:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    marginTop: _.sm,
    backgroundColor: _.colorTinygrailBg
  },
  inputWrap: {
    paddingLeft: 4,
    borderColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon),
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  balance: {
    marginTop: 16
  },
  slider: {
    height: 40,
    marginTop: _.sm,
    opacity: 0.8
  },
  btnSubmit: {
    width: 96
  },
  btnRoot: {
    height: 36
  }
}))
