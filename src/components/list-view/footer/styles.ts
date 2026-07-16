/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:00:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:34:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 96,
    paddingVertical: 8,
    paddingHorizontal: _.lg
  },
  text: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize14
  },
  textMt: {
    maxWidth: _.web('64%', _.window.contentWidth - 2 * _.md),
    marginTop: _.sm,
    ..._.fontSize14
  },
  empty: {
    minHeight: Math.floor(_.window.height * 0.64)
  },
  noMore: {
    padding: 8,
    marginTop: _.lg
  }
}))
