/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:46:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 10:43:33
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    width: '50%',
    paddingHorizontal: _._wind,
    paddingVertical: _.sm
  },
  inView: {
    minWidth: 32,
    minHeight: 32
  },
  level: {
    marginRight: -2,
    opacity: 0.8
  }
})
