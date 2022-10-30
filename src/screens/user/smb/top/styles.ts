/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:53:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-30 15:53:53
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
  tags: {
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  touch: {
    marginRight: _.sm,
    marginBottom: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  tag: {
    paddingRight: 4,
    paddingLeft: 4
  },
  loading: {
    marginLeft: -24,
    transform: [
      {
        scale: 0.8
      }
    ]
  }
}))
