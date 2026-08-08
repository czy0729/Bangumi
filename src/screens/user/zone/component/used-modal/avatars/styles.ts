/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 08:14:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatars: {
    minHeight: 64,
    paddingVertical: _.sm,
    marginTop: _.sm
  },
  more: {
    marginRight: _.sm
  },
  moreTouch: {
    width: 64,
    height: 64
  },
  moreCircle: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 32
  }
}))
