/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:19:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 08:40:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  progress: {
    marginTop: _.hairlineWidth,
    borderRadius: _.radiusXs,
    backgroundColor: _.select(_.colorBg, 'rgba(255, 255, 255, 0.1)'),
    overflow: 'hidden'
  },
  progressBar: {
    backgroundColor: _.select('rgba(128, 128, 128, 0.2)', 'rgba(255, 255, 255, 0.2)'),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  progressActive: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: _.colorPrimary,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
