/*
 * @Author: czy0729
 * @Date: 2022-08-01 17:48:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-01 17:48:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  block: {
    marginVertical: _.sm,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  padding: {
    paddingBottom: _.sm
  }
}))
