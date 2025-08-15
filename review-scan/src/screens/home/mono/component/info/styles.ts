/*
 * @Author: czy0729
 * @Date: 2022-06-21 04:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 05:26:50
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
  }
}))
