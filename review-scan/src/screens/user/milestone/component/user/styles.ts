/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:52:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 08:07:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  user: {
    paddingBottom: 16,
    paddingLeft: 1,
    marginHorizontal: 4,
    marginBottom: 24,
    borderBottomWidth: 2,
    borderColor: _.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')
  },
  content: {
    marginLeft: 12
  }
}))
