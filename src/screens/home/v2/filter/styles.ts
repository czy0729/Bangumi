/*
 * @Author: czy0729
 * @Date: 2022-06-19 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 08:42:38
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
    height: 40,
    paddingVertical: 0,
    ..._.fontSize16,
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
