/*
 * @Author: czy0729
 * @Date: 2024-08-22 15:35:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 11:11:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  img: {
    maxWidth: _.web('96%', _.window.contentWidth - (_.sm + 36) * 2),
    padding: 12,
    marginTop: _.sm,
    marginBottom: _.xs,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  content: {
    minWidth: Math.floor(_.window.contentWidth * (9 / 16))
  }
}))
