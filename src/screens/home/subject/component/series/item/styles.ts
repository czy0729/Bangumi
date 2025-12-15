/*
 * @Author: czy0729
 * @Date: 2022-11-24 19:25:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 15:13:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    paddingRight: _.xs,
    marginLeft: _.sm,
    borderRadius: 4,
    overflow: 'hidden'
  },
  cover: {
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1)
  },
  text: {
    marginLeft: 6
  }
}))
