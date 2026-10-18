/*
 * @Author: czy0729
 * @Date: 2026-01-02 04:38:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:16:43
 *
 * 背景圆球尺寸与配色
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const BALL = _.window.height * 0.5

  return {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: _.window.height,
      overflow: 'hidden'
    },
    ballTL: {
      position: 'absolute',
      top: Math.floor(-BALL * 0.15),
      right: Math.floor(-BALL * 0.3),
      width: BALL,
      height: BALL,
      backgroundColor: _.select('rgba(170, 180, 200, 0.16)', 'rgba(170, 180, 200, 0.04)'),
      borderRadius: BALL / 2
    },
    ballBR: {
      position: 'absolute',
      bottom: 0,
      left: Math.floor(-BALL * 0.3),
      width: BALL,
      height: BALL,
      backgroundColor: _.select('rgba(180, 170, 190, 0.16)', 'rgba(180, 170, 190, 0.04)'),
      borderRadius: BALL / 2
    }
  }
})
