/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:01:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 14:01:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  assets: {
    minHeight: _.ios(56, 32),
    paddingBottom: _.ios(16, 0),
    marginTop: _.ios(-20, 0)
  },
  touch: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginLeft: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))