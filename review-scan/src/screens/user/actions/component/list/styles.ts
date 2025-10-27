/*
 * @Author: czy0729
 * @Date: 2023-06-29 17:27:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-06-29 17:27:08
 */
import { _ } from '@stores'

export const styles = _.create({
  setting: {
    marginVertical: _.md
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
})
