/*
 * @Author: czy0729
 * @Date: 2024-04-10 12:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 14:48:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  highlight: {
    backgroundColor: _.select(_.colorMainLightBorder, _.colorMainLight),
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: _.select('rgba(0, 0, 0, 0.16)', 'rgba(0, 0, 0, 0.32)')
  }
}))
