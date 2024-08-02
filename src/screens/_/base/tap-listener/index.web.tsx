/*
 * @Author: czy0729
 * @Date: 2023-06-02 22:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:52:42
 */
import { useEffect } from 'react'
import { Component } from '@components'
import { _, uiStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

export const TapListener = ({ children }) => {
  r(COMPONENT)

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

  return (
    <Component id='base-tap-listener' style={_.container.flex}>
      {children}
    </Component>
  )
}

export default TapListener
