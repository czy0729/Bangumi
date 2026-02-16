/*
 * @Author: czy0729
 * @Date: 2024-04-08 22:13:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 22:41:11
 */
import { _ } from '@stores'

export const styles = _.create({
  service: {
    marginRight: -_._wind
  },
  item: {
    marginRight: _.md,
    marginTop: _.md
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: _.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
})
