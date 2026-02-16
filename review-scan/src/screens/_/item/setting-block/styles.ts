/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:07:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 21:21:23
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
  icon: {
    paddingHorizontal: _.sm
  },
  active: {
    borderColor: _.colorSuccess
  },
  body: {
    height: 80,
    paddingHorizontal: _.xs
  },
  sub: {
    paddingTop: 8,
    paddingLeft: 20,
    marginLeft: 24,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: _.colorBorder
  }
}))
