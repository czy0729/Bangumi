/*
 * @Author: czy0729
 * @Date: 2024-04-04 02:06:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-04 02:06:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = 2
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  return {
    item: {
      marginTop: _.md,
      marginLeft: _.md
    },
    itemBody: {
      width,
      height: width,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
    },
    side: {
      marginLeft: 0
    }
  }
})
