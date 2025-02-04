/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:24:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-02 18:30:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 12
  },
  inView: {
    minWidth: 52,
    minHeight: 52
  },
  avatar: {
    width: 80,
    paddingRight: 12
  },
  content: {
    padding: 15,
    paddingTop: 12,
    marginTop: -1,
    borderWidth: 5,
    borderRadius: _.radiusMd,
    borderColor: _.select('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.88)')
  }
}))
