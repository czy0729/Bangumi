/*
 * @Author: czy0729
 * @Date: 2026-03-12 04:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 06:05:47
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    padding: _.sm
  },
  shape: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    ..._.shadow,
    shadowOpacity: 0.32,
    elevation: 8
  }
})
