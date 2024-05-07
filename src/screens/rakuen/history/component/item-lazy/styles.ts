/*
 * @Author: czy0729
 * @Date: 2022-11-28 05:51:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-28 06:20:18
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
    paddingVertical: _.md,
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  favor: {
    marginTop: 1
  }
}))
