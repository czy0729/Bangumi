/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 21:30:38
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { InnerProps } from './types'

/** 提前渲染的 y 轴距离 */
const preDistance = Math.floor(_.window.height * 0.5)

export default (props: InnerProps) => {
  r(COMPONENT)

  const { index = 0, log, flex, visibleBottom, onLayout, children, ...other } = props
  const y = props.y as number | undefined
  const hasY = typeof y === 'number'

  const [currentY, setCurrentY] = useState<number | undefined>(y)
  const [show, setShow] = useState(hasY && visibleBottom ? y <= visibleBottom : false)

  const onLayoutRef = useRef(onLayout)
  useEffect(() => {
    onLayoutRef.current = onLayout
  }, [onLayout])

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayoutRef.current?.(event)
      setCurrentY(event.nativeEvent.layout.y)
    },
    []
  )

  useEffect(() => {
    if (show) return

    /**
     * 通常 key 是 subjectId, 而 y 是通过 height * index 得到的,
     * 为了防止同一个组件在后续重渲染中, y 变小了不会自动判断是否能显示
     */
    if (hasY && y < currentY) setCurrentY(y)

    // 计算有效的 y 值（取较小的），判断是否进入可视区域
    const effectiveY: number | undefined = hasY && y < currentY ? y : currentY
    if (typeof effectiveY === 'number' && visibleBottom + preDistance >= effectiveY) setShow(true)
  }, [show, hasY, y, currentY, visibleBottom])

  const logText: string[] = []
  if (DEV && log) {
    if (hasY) {
      logText.push(`y:${Math.floor(y)}`)
    } else {
      logText.push(`cy:${Math.floor(currentY)}`)
    }
    if (index) logText.push(`i:${index}`)
  }

  const Component = flex ? Flex : View

  return (
    <Component {...other} collapsable={false} onLayout={hasY ? undefined : handleLayout}>
      {show ? children : null}
      {log && (
        <Flex style={styles.dev}>
          <Text style={styles.devText} type='__plain__' size={8} bold shadow>
            {logText.join(', ')}
          </Text>
        </Flex>
      )}
    </Component>
  )
}
