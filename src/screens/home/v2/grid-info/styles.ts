/*
 * @Author: czy0729
 * @Date: 2022-06-20 13:57:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-20 13:57:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.device(16, 32),
    paddingHorizontal: _.wind
  },
  icon: {
    marginBottom: -1
  },
  touchable: {
    padding: _.sm
  },
  placeholder: {
    marginBottom: -1.5,
    marginLeft: _.sm
  }
}))
