/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-28 23:08:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: _.isLandscape ? '33%' : '50%',
    paddingVertical: _.sm,
    paddingRight: _.sm
  },
  user: {
    marginTop: 2,
    marginRight: _.sm
  },
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  },
  rank: {
    opacity: _.select(1, 0.92)
  },
  progress: {
    maxWidth: Math.floor(_.window.contentWidth * 0.33),
    height: 2,
    marginTop: _.xs,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBorder, _.colorTinygrailIcon),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  progressBar: {
    height: 2,
    backgroundColor: _.colorSuccess,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
