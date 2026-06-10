/*
 * @Author: czy0729
 * @Date: 2026-06-02 02:05:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 02:43:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  inputWrap: {
    position: 'relative'
  },
  input: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 17,
    ..._.fontSize14,
    backgroundColor: _.colorBg,
    borderWidth: 0
  },
  lockedText: {
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  lock: {
    position: 'absolute',
    zIndex: 1,
    right: _.xs,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 6
  }
}))
