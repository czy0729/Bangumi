/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:16:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 条目样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.wind,
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
  ft: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0
  }
}))
