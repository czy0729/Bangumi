/*
 * @Author: czy0729
 * @Date: 2022-11-07 15:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 05:23:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.sm,
    height: 46,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  contentContainerStyle: {
    height: 44,
    paddingRight: _._wind
  },
  item: {
    height: 44,
    paddingHorizontal: 6
  }
}))
