/*
 * @Author: czy0729
 * @Date: 2022-05-04 14:04:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:19:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  input: {
    fontFamily: _.fontBoldFamily,
    borderRadius: _.radiusXs
  },
  multiline: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
