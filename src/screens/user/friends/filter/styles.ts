/*
 * @Author: czy0729
 * @Date: 2022-08-07 04:31:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-07 04:31:03
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
    fontWeight: 'bold',
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
