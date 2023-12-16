/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:52:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _._wind
  },
  back: {
    marginLeft: -8
  },
  backIsPad: {
    position: 'absolute',
    zIndex: 1,
    top: 24,
    left: _._wind
  },
  avatar: {
    marginHorizontal: _.xs
  }
}))
