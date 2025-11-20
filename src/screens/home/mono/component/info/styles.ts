/*
 * @Author: czy0729
 * @Date: 2022-06-21 04:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:41:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  info: {
    minHeight: _.window.height * 1.2
  },
  container: {
    minHeight: _.window.height * 0.56,
    ..._.container.inner
  },
  loading: {
    minHeight: _.window.height * 0.48
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
