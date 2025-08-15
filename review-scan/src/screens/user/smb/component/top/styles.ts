/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 15:57:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  top: _.web(
    {
      position: 'absolute',
      zIndex: 1,
      top: 56,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.84)'
    },
    undefined
  ),
  container: {
    paddingTop: _.web(0, _.xs),
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  popover: {
    padding: _.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  more: {
    marginRight: _.ios(-13, -11)
  },
  loading: {
    marginLeft: -24,
    transform: [
      {
        scale: 0.4
      }
    ]
  }
}))
