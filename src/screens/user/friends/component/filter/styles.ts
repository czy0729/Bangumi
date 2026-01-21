/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:54:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    height: 56,
    paddingVertical: 10,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  },
  input: {
    height: 36,
    paddingVertical: 0,
    ..._.fontSize(16),
    fontWeight: '800',
    textAlign: 'center',
    backgroundColor: _.select(_.colorBorder, _.colorPlain),
    borderRadius: 40
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
    top: 6,
    right: 26,
    minWidth: 44,
    height: 44
  },
  percent: {
    marginRight: _.xs,
    opacity: 0.88
  }
}))
