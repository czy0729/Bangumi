/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:41:06
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-18 15:41:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    bottom: 0
  },
  touch: {
    width: _.window.width / 5,
    height: _.tabBarHeight,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
