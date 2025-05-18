/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 02:53:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm,
    borderBottomColor: _.colorTinygrailBorder,
    borderBottomWidth: _.hairlineWidth
  },
  time: {
    width: 96
  },
  progress: {
    width: '80%',
    height: 2,
    marginTop: _.xs,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBorder, _.colorTinygrailIcon),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  progressBar: {
    height: 2,
    backgroundColor: _.colorBid,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  badge: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    marginTop: -14,
    opacity: 0.8
  }
}))
