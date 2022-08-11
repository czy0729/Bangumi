/*
 * @Author: czy0729
 * @Date: 2022-06-19 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 14:01:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    height: 64,
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBg
  },
  input: {
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
  }
}))
