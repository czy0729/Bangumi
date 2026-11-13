/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  body: {
    backgroundColor: _.ios('transparent', _.select(_.colorPlain, _._colorDarkModeLevel1))
  }
}))
