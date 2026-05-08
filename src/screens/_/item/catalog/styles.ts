/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:46:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 05:40:11
 */
import { _ } from '@stores'
import { CATALOG_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  inView: {
    minWidth: CATALOG_WIDTH,
    minHeight: CATALOG_WIDTH
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: CATALOG_WIDTH,
    paddingVertical: _.xs,
    paddingLeft: _.r(24)
  }
}))
