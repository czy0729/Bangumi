/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:23:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:29:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  subjects: {
    height: 364,
    maxHeight: Math.floor(_.window.height * 0.64),
    paddingLeft: _.sm,
    paddingBottom: _.sm,
    marginTop: -_.sm
  },
  content: {
    paddingLeft: 12
  }
}))
