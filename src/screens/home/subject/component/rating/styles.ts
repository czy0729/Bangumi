/*
 * @Author: czy0729
 * @Date: 2022-07-06 23:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 08:38:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 200,
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  hideScoreContainer: {
    minHeight: _.r(96)
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
    marginTop: _.r(64)
  }
}))
