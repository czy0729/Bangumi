/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-24 20:12:59
 */
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useObserver } from 'mobx-react'
import { useDom } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { memoStyles } from './styles'
import { Props } from './types'
import './index.scss'

const cls = 'scroll-view-horizontal'

function ScrollViewHorizontal({ children, ...other }: Props) {
  const ref = useDom(cls)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  useEffect(() => {
    const container = ref.current
    const activeCls = `${cls}--grabbing`

    const handleMouseDown = (e: { pageX: number }) => {
      setIsDown(true)
      container.style.cursor = 'grabbing'
      setStartX(e.pageX - container.offsetLeft)
      setScrollLeft(container.scrollLeft)
    }
    const handleMouseLeave = () => {
      setIsDown(false)
      container.classList.remove(activeCls)
      container.style.cursor = 'grab'
    }
    const handleMouseUp = () => {
      setIsDown(false)
      container.classList.remove(activeCls)
      container.style.cursor = 'grab'
    }
    const handleMouseMove = (e: { preventDefault: () => void; pageX: number }) => {
      if (!isDown) return

      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = x - startX // 拖动速度调整
      container.scrollLeft = scrollLeft - walk

      // 如果移动距离大于阈值，设置拖动状态，用于主动禁用内部点击事件
      if (Math.abs(walk) > 10) {
        container.classList.add(activeCls)
      }
    }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDown, startX, scrollLeft, ref])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <ScrollView
        ref={ref}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={16}
        {...SCROLL_VIEW_RESET_PROPS}
        {...other}
        horizontal
      >
        {children}
      </ScrollView>
    )
  })
}

export default ScrollViewHorizontal
