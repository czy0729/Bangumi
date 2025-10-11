/*
 * @Author: czy0729
 * @Date: 2022-08-25 21:10:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 17:43:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.md + 6,
    left: _.wind
  },
  placeholder: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  }
}))
