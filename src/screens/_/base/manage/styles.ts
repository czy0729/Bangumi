/*
 * @Author: czy0729
 * @Date: 2022-07-22 18:25:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:22:00
 */
import { _ } from '@stores'

export const styles = _.create({
  manage: {
    height: 48,
    minWidth: 48,
    marginTop: -2,
    marginRight: -10,
    overflow: 'hidden'
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    width: 40
  },
  text: {
    width: 40,
    marginTop: 2
  },
  openInNew: {
    marginTop: -8,
    marginRight: -8
  }
})
