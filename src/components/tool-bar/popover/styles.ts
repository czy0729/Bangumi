/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 00:49:54
 */
import { _ } from '@stores'

export const styles = _.create({
  opacity: {
    marginRight: -24,
    marginLeft: -8,
    backgroundColor: 'transparent'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  loadingIcon: {
    transform: [
      {
        scale: 0.75
      }
    ]
  }
})
