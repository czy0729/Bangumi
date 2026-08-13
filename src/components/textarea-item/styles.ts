/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  },
  input: {
    paddingHorizontal: _.md,
    paddingVertical: _.md,
    ..._.fontSize17,
    textAlignVertical: 'top',
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
  },
  count: {
    position: 'absolute',
    right: _.md,
    bottom: _.md
  }
}))
