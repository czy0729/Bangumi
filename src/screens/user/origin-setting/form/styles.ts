/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:26:49
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 07:26:49
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
    right: 8
  },
  input: {
    height: 44,
    paddingVertical: 0
  }
}))
