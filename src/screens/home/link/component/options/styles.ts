/*
 * @Author: czy0729
 * @Date: 2025-12-16 03:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 04:21:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.md,
    paddingHorizontal: _.wind
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: _.colorMainLight,
    borderLeftWidth: 3,
    borderColor: _.colorMainBorder,
    borderRadius: 4
  },
  disabled: {
    backgroundColor: _.colorBg,
    borderColor: _.colorBorder,
    opacity: 0.8
  },
  theme: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: _._wind - 6
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: 0.8
      }
    ]
  }
}))
