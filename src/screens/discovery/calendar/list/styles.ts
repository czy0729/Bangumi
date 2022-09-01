/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:04:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-01 14:04:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind - _.device(_._wind, _._wind + 8)
  },
  row: {
    width: '100%'
  },
  line: {
    height: 1,
    marginVertical: _.md,
    marginHorizontal: _._wind,
    backgroundColor: _.colorMain
  }
}))
