/*
 * @Author: czy0729
 * @Date: 2023-03-11 13:11:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 17:42:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  input: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontFamily: _.fontBoldFamily,
    color: _.colorDesc,
    ..._.fontSize(14),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  inputMulti: {
    width: '100%',
    paddingTop: 0,
    fontFamily: _.fontBoldFamily,
    color: _.colorDesc,
    ..._.fontSize(14)
  }
}))
