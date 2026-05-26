/*
 * @Author: czy0729
 * @Date: 2026-05-26 19:18:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 00:21:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: 2,
    paddingHorizontal: 1,
    backgroundColor: _.select(_.colorDarkModeLevel2, _.colorDarkModeLevel1),
    borderRadius: 4,
    overflow: 'hidden'
  },
  digitBox: {
    width: 16,
    height: 18,
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden'
  },
  digitGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  digitLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    marginTop: -0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  digitLineShadowTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    marginTop: -2,
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  digitLineShadowBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  digitDot: {
    width: 10
  }
}))
