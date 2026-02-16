/*
 * @Author: czy0729
 * @Date: 2025-02-20 16:49:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 03:56:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  detail: {
    minHeight: 120,
    maxHeight: _.window.height * 0.56
  },
  contentContainerStyle: {
    paddingVertical: _.sm,
    paddingRight: _.xs,
    paddingLeft: _.md,
    marginTop: _.sm,
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  },
  tag: {
    marginTop: 4,
    marginRight: 4
  },
  label: {
    minWidth: 152
  },
  layer: {
    position: 'absolute',
    zIndex: 1,
    right: _.xs,
    bottom: _.xs
  }
}))
