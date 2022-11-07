/*
 * @Author: czy0729
 * @Date: 2022-11-07 15:30:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 15:31:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _._wind,
    height: _.r(46),
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  contentContainerStyle: {
    height: _.r(44),
    paddingLeft: _.r(_.xs),
    paddingRight: _.r(_._wind)
  },
  item: {
    height: _.r(44),
    paddingHorizontal: _.r(6)
  }
}))
