/*
 * @Author: czy0729
 * @Date: 2022-11-11 07:01:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 17:32:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    borderColor: _.select('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.16)'),
    borderWidth: 1,
    borderRadius: _.radiusXs
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
