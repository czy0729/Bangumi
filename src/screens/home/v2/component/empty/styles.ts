/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 22:26:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    minHeight: 320
  },
  top: {
    minHeight: 280
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    marginTop: _.md,
    ..._.fontSize14
  },
  btn: {
    width: 120,
    marginTop: _.lg
  }
}))
