/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 03:55:30
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
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
    top: 20,
    right: 16,
    width: 44,
    height: 44
  }
}))
