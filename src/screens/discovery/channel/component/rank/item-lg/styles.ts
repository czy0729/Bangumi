/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 注目榜等宽卡片样式
 */
import { _ } from '@stores'
import { CARD_PADDING, COVER_RATIO, GAP } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const width = _.window.contentWidth

  return {
    item: {
      marginTop: GAP,
      marginBottom: Math.floor(GAP / 2)
    },
    cover: {
      width,
      height: Math.floor(width * COVER_RATIO)
    },
    desc: {
      position: 'absolute',
      zIndex: 4,
      right: CARD_PADDING,
      bottom: CARD_PADDING,
      left: CARD_PADDING,
      opacity: 0.92
    },
    rec: {
      top: 6,
      left: 12,
      right: undefined,
      opacity: 0.85
    },
    recText: {
      fontSize: 40,
      lineHeight: 48,
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
