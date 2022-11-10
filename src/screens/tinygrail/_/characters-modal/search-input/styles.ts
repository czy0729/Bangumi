/*
 * @Author: czy0729
 * @Date: 2022-11-11 07:01:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 07:01:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingLeft: 8,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 26,
    padding: 0,
    ..._.fontSize(10),
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  search: {
    marginRight: 6
  }
}))
