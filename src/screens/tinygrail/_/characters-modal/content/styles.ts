/*
 * @Author: czy0729
 * @Date: 2025-05-03 16:16:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:17:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    height: Math.floor(_.window.height * 0.64),
    maxHeight: 664,
    paddingBottom: _.sm,
    marginTop: _.md
  }
}))
