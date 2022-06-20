/*
 * @Author: czy0729
 * @Date: 2022-06-19 17:27:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-19 17:27:36
 */
import { _ } from '@stores'

export const styles = _.create({
  icons: {
    position: 'absolute',
    zIndex: 3,
    top: _.statusBarHeight + 4,
    right: _._wind
  },
  icon: {
    marginBottom: 0
  }
})
