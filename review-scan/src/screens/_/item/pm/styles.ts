/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:18:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  avatar: {
    marginTop: _.sm - 2
  },
  inView: {
    minWidth: 40,
    minHeight: 40
  },
  item: {
    paddingTop: _.sm,
    paddingRight: _.wind,
    paddingBottom: _.md,
    marginLeft: _.sm
  },
  info: {
    paddingTop: 4,
    paddingBottom: 7,
    paddingHorizontal: 10,
    marginTop: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
