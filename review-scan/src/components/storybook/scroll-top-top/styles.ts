/*
 * @Author: czy0729
 * @Date: 2023-11-04 04:30:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 20:48:46
 */
import { _ } from '@stores'

export const styles = _.create({
  scrollToTop: {
    position: 'absolute',
    zIndex: 99999,
    top: 0,
    right: 48,
    left: 48,
    height: 20,
    borderBottomRightRadius: _.radiusMd,
    borderBottomLeftRadius: _.radiusMd,
    overflow: 'hidden',
    cursor: 'pointer'
  }
})
