/*
 * @Author: czy0729
 * @Date: 2026-11-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { _ } from '@stores'
import { DRAWER_WITDH, SWIPE_EDGE_EXTRA, SWIPE_HANDLE_RIGHT } from '../ds'

export const memoStyles = _.memoStyles(() => {
  const handleWidth = 3
  const handleHeight = 48
  const handleOffset = SWIPE_HANDLE_RIGHT

  return {
    body: {
      zIndex: 4,
      width: DRAWER_WITDH,
      height: _.window.height,
      backgroundColor: _.colorPlain
    },
    swipe: {
      position: 'absolute',
      zIndex: 5,
      top: 0,
      bottom: 0,
      width: handleOffset + SWIPE_EDGE_EXTRA
    },
    swipeLeft: {
      left: 0
    },
    swipeRight: {
      right: 0
    },
    swipeHandle: {
      position: 'absolute',
      top: '52%',
      width: handleWidth,
      height: handleHeight,
      marginTop: -handleHeight / 2,
      borderRadius: handleWidth,
      backgroundColor: _.select(_.colorIcon, _.colorDarkModeLevel2)
    },
    swipeHandleLeft: {
      left: handleOffset - handleWidth / 2
    },
    swipeHandleRight: {
      right: handleOffset - handleWidth / 2
    }
  }
})
