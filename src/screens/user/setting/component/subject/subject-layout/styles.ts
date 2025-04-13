/*
 * @Author: czy0729
 * @Date: 2025-04-11 16:58:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 18:44:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  layout: {
    paddingHorizontal: _.wind,
    marginTop: 20,
    marginBottom: _.sm
  },
  touch: {
    padding: _.sm
  }
}))
