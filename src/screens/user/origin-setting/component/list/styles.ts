/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:23:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  section: {
    padding: _.select(0, _.md),
    marginBottom: _.md,
    backgroundColor: _.select('transparent', _.colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  list: {
    minHeight: 80,
    marginTop: _.md,
    marginHorizontal: _.select(0, -4)
  }
}))
