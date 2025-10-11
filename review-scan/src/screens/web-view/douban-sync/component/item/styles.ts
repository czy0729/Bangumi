/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-17 00:02:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind,
    paddingVertical: _.md,
    marginBottom: _.sm
  },
  body: {
    paddingLeft: _.md
  },
  selectors: {
    width: 48
  },
  toolbar: {
    width: '100%',
    paddingRight: _._wind,
    marginTop: _.xs
  },
  loading: {
    marginTop: 13
  }
}))
