/*
 * @Author: czy0729
 * @Date: 2024-01-31 16:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-31 13:19:05
 */
import { _ } from '@stores'

export const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  segmentedControl: {
    height: _.r(32),
    width: _.r(196)
  },
  acSearchPopable: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingLeft: _._wind
  }
})
