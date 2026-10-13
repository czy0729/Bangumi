/*
 * @Author: czy0729
 * @Date: 2024-08-20 16:38:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜半宽卡片样式
 */
import { _ } from '@stores'
import { CARD_PADDING, COVER_RATIO, GAP } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor((_.window.contentWidth - GAP) / 2)

  return {
    item: {
      marginBottom: GAP
    },
    itemMarginRight: {
      marginRight: GAP
    },
    cover: {
      width,
      height: Math.floor(width * COVER_RATIO)
    },
    desc: {
      position: 'absolute',
      zIndex: 4,
      right: CARD_PADDING,
      bottom: _.sm,
      left: CARD_PADDING,
      opacity: 0.92
    },
    rec: {
      top: 4,
      left: 8,
      right: undefined,
      opacity: 0.85
    },
    recText: {
      fontSize: 30,
      lineHeight: 38,
      color: _.select(_.colorPlain, _.colorDesc),
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: {
        width: 0,
        height: 1
      },
      textShadowRadius: 4
    }
  }
})
