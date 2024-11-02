/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 06:50:52
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: _.md,
    opacity: 0.72
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  split: {
    marginHorizontal: 4,
    opacity: 0.72,
    pointerEvents: 'none'
  },
  loading: {
    marginLeft: _.xs,
    transform: [
      {
        scale: 0.72
      }
    ]
  }
})
