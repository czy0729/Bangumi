/*
 * @Author: czy0729
 * @Date: 2024-11-01 10:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:36:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    height: 60
  },
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: 12,
    paddingLeft: _.sm,
    paddingRight: _.wind + 48
  },
  title: {
    marginTop: 6
  },
  favor: {
    marginTop: 6,
    marginLeft: _.md
  },
  rec: {
    top: 12,
    right: _._wind
  }
}))
