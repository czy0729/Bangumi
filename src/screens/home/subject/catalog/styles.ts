/*
 * @Author: czy0729
 * @Date: 2022-08-25 22:00:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:24:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 92,
    marginTop: _.lg
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md + 4
  },
  scrollView: {
    marginTop: _.md,
    marginBottom: -_.md
  }
}))
