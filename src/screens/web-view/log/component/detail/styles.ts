/*
 * @Author: czy0729
 * @Date: 2025-02-20 16:49:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 17:16:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  detail: {
    maxHeight: _.window.height * 0.56
  },
  contentContainerStyle: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginTop: _.sm,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  },
  tag: {
    marginTop: 4,
    marginRight: 8
  },
  label: {
    minWidth: 160
  }
}))
