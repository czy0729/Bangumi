/*
 * @Author: czy0729
 * @Date: 2022-07-06 23:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 01:38:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  total: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 0
  },
  chart: {
    minHeight: 144,
    marginTop: _.md,
    marginHorizontal: -4
  },
  item: {
    height: 144,
    paddingBottom: _.xs,
    marginTop: -_.md
  },
  itemFill: {
    position: 'absolute',
    left: '50%',
    width: _.device(6, 8),
    marginLeft: _.device(-3, -4),
    backgroundColor: _.select(_.colorWait, _._colorSub),
    borderRadius: _.device(6, 4)
  },
  itemFillActive: {
    backgroundColor: _.colorWarning
  },
  count: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    left: 0,
    marginBottom: 4
  },
  friend: {
    paddingLeft: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  deviation: {
    paddingLeft: _.xs,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
