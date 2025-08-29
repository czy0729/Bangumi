/*
 * @Author: czy0729
 * @Date: 2024-02-12 02:11:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 04:28:17
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000'
  },
  extra: {
    maginTop: _.md,
    opacity: 0.6
  }
})
