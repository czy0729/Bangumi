/*
 * @Author: czy0729
 * @Date: 2022-06-21 04:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 17:25:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  info: {
    minHeight: Math.floor(_.window.height * 1.2)
  },
  container: {
    minHeight: Math.floor(_.window.height * 0.56),
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  loading: {
    minHeight: Math.floor(_.window.height * 0.48)
  },
  touch: {
    paddingHorizontal: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  sound: {
    marginLeft: -_.xs,
    marginBottom: -2
  },
  more: {
    marginTop: _.lg,
    marginRight: -5
  }
}))
