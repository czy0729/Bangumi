/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    height: 44,
    paddingHorizontal: _._wind
  },
  content: {
    flex: 1
  },
  name: {
    flex: 1,
    marginLeft: _.sm
  },
  disabled: {
    opacity: 0.4
  }
})
