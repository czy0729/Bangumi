/*
 * @Author: czy0729
 * @Date: 2025-04-03 22:09:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 22:31:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: 32,
    height: 40,
    marginTop: 6,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  content: {
    width: 22,
    height: 30,
    borderRadius: 3,
    overflow: 'hidden'
  },
  placeholder: {
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2)
  }
}))
