/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:19:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-27 17:19:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 24,
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 2
  }
}))
