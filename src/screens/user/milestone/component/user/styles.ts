/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:52:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-16 21:55:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  user: {
    paddingBottom: 16,
    paddingLeft: 1,
    marginHorizontal: 4,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: _.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.16)')
  },
  userSm: {
    paddingBottom: 8
  },
  content: {
    marginLeft: 12
  },
  back: {
    marginRight: _.xs,
    marginLeft: -6
  }
}))
