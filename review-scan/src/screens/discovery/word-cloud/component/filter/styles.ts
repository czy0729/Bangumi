/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 19:16:31
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: 8,
    opacity: 0.72
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 6
  },
  split: {
    opacity: 0.72,
    pointerEvents: 'none'
  },
  loading: {
    marginLeft: _.xs,
    transform: [
      {
        scale: _.web(0.72, 1)
      }
    ]
  }
})
