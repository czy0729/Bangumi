/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 16:26:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
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
    marginRight: -9
  },
  loading: {
    marginTop: 5,
    marginLeft: -24,
    transform: [
      {
        scale: 0.4
      }
    ]
  }
}))
