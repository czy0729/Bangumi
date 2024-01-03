/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:16:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-28 17:16:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    marginRight: _.xs
  },
  item: {
    paddingTop: _.sm,
    paddingBottom: _.sm + 4,
    paddingHorizontal: _.md,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  },
  left: {
    marginTop: 2,
    marginLeft: -2
  },
  right: {
    marginTop: 2,
    marginRight: -2
  }
}))
