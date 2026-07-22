/*
 * @Author: czy0729
 * @Date: 2024-10-12 15:42:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-23 07:27:26
 */
import { _ } from '@stores'

export const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: 0.8
      }
    ]
  },
  segmentedControl: {
    height: 32,
    marginVertical: _.xs
  },
  theme: {
    position: 'absolute',
    zIndex: 1,
    top: -8,
    left: _._wind - 6
  },
  share: {
    position: 'absolute',
    zIndex: 1,
    top: -9,
    right: _._wind - 6
  },
  notice: {
    marginTop: _.md,
    marginHorizontal: _._wind
  }
})
