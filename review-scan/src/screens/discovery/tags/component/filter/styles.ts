/*
 * @Author: czy0729
 * @Date: 2022-09-03 13:05:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-03 13:05:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    height: 64,
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    marginBottom: _._wind,
    backgroundColor: _.colorBg
  },
  input: {
    height: 40,
    paddingVertical: 0,
    ..._.fontSize16,
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
