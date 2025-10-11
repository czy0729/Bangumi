/*
 * @Author: czy0729
 * @Date: 2022-11-23 09:56:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-23 11:02:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  form: {
    padding: 12,
    paddingRight: 8,
    marginBottom: _.md,
    backgroundColor: _.colorBg,
    borderColor: _.colorBorder,
    borderWidth: 1,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: 4,
    right: 7
  },
  input: {
    height: 44,
    paddingVertical: 0
  }
}))
