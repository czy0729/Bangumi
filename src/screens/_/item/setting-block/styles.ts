/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:07:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 20:08:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _._wind,
    paddingBottom: _.md
  },
  touch: {
    minWidth: _.window.contentWidth / 5,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  active: {
    borderColor: _.colorSuccess
  },
  body: {
    height: 80,
    paddingHorizontal: _.xs
  }
}))
