/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-10 14:15:03
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
    top: 20,
    right: 16,
    width: 44,
    height: 44
  }
}))
