/*
 * @Author: czy0729
 * @Date: 2022-08-25 22:00:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-25 22:00:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md + 4
  },
  scrollView: {
    marginTop: _.md,
    marginBottom: -_.md
  },
  item: {
    minWidth: 96,
    marginRight: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  text: {
    maxWidth: _.r(_.window.contentWidth * 0.24)
  }
}))
