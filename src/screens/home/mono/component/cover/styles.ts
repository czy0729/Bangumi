/*
 * @Author: czy0729
 * @Date: 2024-03-19 19:26:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:28:32
 */
import { _ } from '@stores'

export const styles = _.create({
  cover: {
    marginTop: 28,
    marginBottom: 16
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    pointerEvents: 'none',
    opacity: 0
  }
})
