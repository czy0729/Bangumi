/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 11:44:23
 */
import { _ } from '@stores'
import { IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const width = _.window.contentWidth / 1.4
  return {
    subject: {
      position: 'absolute',
      zIndex: 10000,
      width,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    container: {
      width,
      height: IMG_HEIGHT,
      backgroundColor: _.select('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.24)'),
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    cover: {
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
    },
    body: {
      height: IMG_HEIGHT,
      paddingVertical: _.sm + 2,
      paddingHorizontal: _.sm + 4
    },
    rank: {
      backgroundColor: _.select('#ffc107', 'rgba(255, 255, 255, 0.16)')
    },
    stars: {
      marginLeft: -2
    }
  }
})
