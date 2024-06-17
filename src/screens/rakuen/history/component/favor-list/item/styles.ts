/*
 * @Author: czy0729
 * @Date: 2022-11-28 05:51:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-04 16:00:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    height: 60
  },
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: 12,
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  title: {
    marginTop: 6
  },
  favor: {
    marginTop: 6,
    marginLeft: _.md
  }
}))
