/*
 * @Author: czy0729
 * @Date: 2022-06-13 18:01:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 16:49:03
 */
import { _ } from '@stores'

export const styles = _.create({
  header: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight
  },
  side: {
    width: 80
  },
  logo: {
    flex: 1
  }
})
