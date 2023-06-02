/*
 * @Author: czy0729
 * @Date: 2023-06-02 22:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-02 23:16:17
 */
import { useEffect } from 'react'
import { uiStore } from '@stores'

export const TapListener = ({ children }) => {
  useEffect(() => {
    function handleTouchEnd(event) {
      const touch = event.changedTouches[event.changedTouches.length - 1]
      uiStore.setXY(Math.floor(touch.clientX), Math.floor(touch.clientY))
    }
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return children
}
