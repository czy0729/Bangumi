/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-12 19:39:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  form: {
    paddingVertical: 16,
    paddingRight: 8,
    paddingLeft: 16,
    marginBottom: 64,
    backgroundColor: _.colorBg,
    borderColor: _.colorBorder,
    borderWidth: 1,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 8
  },
  input: {
    height: 44,
    paddingVertical: 0
  }
}))
