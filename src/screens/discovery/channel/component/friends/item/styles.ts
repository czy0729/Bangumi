/*
 * @Author: czy0729
 * @Date: 2026-10-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友卡片样式
 */
import { _ } from '@stores'
import { CARD_PADDING, COVER_RATIO, GAP } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor((_.window.contentWidth - GAP * 2) / 3)

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
      minHeight: 13,
      opacity: 0.92
    }
  }
})
