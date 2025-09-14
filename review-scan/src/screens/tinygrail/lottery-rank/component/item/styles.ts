/*
 * @Author: czy0729
 * @Date: 2025-07-17 15:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 23:54:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 12,
    paddingHorizontal: _.wind
  },
  image: {
    marginRight: 16
  },
  user: {
    marginLeft: 32
  },
  avatar: {
    width: 56
  },
  name: {
    width: 56,
    marginTop: _.sm
  },
  side: {
    width: 80
  }
}))
