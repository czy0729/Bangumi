/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 07:53:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    minHeight: 64,
    paddingBottom: 20
  },
  image: {
    marginBottom: 8,
    ..._.shadow
  },
  title: {
    marginBottom: 2
  },
  sub: {
    marginTop: 2,
    transform: [
      {
        scale: 0.92
      }
    ]
  },
  stars: {
    marginTop: _.xs,
    transform: [
      {
        scale: _.web(0.8, 0.92)
      }
    ]
  },
  starsFull: {
    transform: [
      {
        scale: _.web(0.72, 0.8)
      }
    ]
  }
}))
