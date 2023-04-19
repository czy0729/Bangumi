/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:51:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 15:12:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    zIndex: 1,
    backgroundColor: _.colorPlain
  },
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  loading: {
    height: 240
  }
}))
