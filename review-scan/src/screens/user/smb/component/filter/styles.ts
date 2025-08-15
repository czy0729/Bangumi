/*
 * @Author: czy0729
 * @Date: 2023-11-22 05:38:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 06:22:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  filter: {
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: _.wind,
    marginTop: -4
  },
  input: {
    height: 34,
    paddingVertical: 0,
    ..._.fontSize14,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: _.colorBorder,
    backgroundColor: 'transparent',
    borderRadius: 34
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
