/*
 * @Author: czy0729
 * @Date: 2022-05-04 16:04:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-04 16:04:09
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.statusBarHeight + 10
  }
})
