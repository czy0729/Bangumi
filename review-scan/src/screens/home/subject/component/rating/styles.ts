/*
 * @Author: czy0729
 * @Date: 2022-07-06 23:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:28:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 200,
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  rate: {
    marginTop: -32
  },
  hide: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: -_.sm
  },
  hideScore: {
    height: _.r(144)
  }
}))
