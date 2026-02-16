/*
 * @Author: czy0729
 * @Date: 2022-12-26 05:12:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:53:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  chart: {
    paddingHorizontal: _.sm,
    marginTop: 56,
    marginHorizontal: -4
  },
  item: {
    height: _.r(128),
    paddingBottom: _.xs,
    marginTop: -_.md
  },
  itemFill: {
    position: 'absolute',
    left: '50%',
    width: 16,
    marginLeft: -8,
    backgroundColor: _.select(_.colorWait, _._colorSub),
    borderRadius: _.radiusXs
  },
  count: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    marginBottom: 4
  }
}))
