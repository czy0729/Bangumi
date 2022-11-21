/*
 * @Author: czy0729
 * @Date: 2022-11-21 07:19:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:20:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  progress: {
    height: 7,
    marginTop: 2,
    borderRadius: _.radiusXs,
    backgroundColor: _.select('rgb(238, 238, 240)', _._colorDarkModeLevel1),
    overflow: 'hidden'
  },
  progressBar: {
    height: 7,
    backgroundColor: _.select('rgb(208, 208, 210)', 'rgba(255, 255, 255, 0.2)'),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  progressActive: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    height: 7,
    backgroundColor: _.colorPrimary,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
