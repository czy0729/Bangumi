/*
 * @Author: czy0729
 * @Date: 2026-05-04 15:45:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 05:11:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginHorizontal: -(_.wind - _._wind)
  },
  block: {
    paddingHorizontal: _._wind,
    paddingVertical: _.md
  },
  item: {
    paddingVertical: _.sm
  },
  section: {
    paddingVertical: _.md
  },
  input: {
    height: 44,
    paddingVertical: 0
  },
  icon: {
    width: 36,
    height: 36
  }
}))
