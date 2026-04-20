/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:18:15
 */
import React, { useCallback, useEffect, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 提前渲染的 y 轴距离 */
let preDistance = 0

if (!DEV) {
  setTimeout(() => {
    preDistance = Math.floor(_.window.height * 0.5)
  }, 20000)
}

export default ({ index = 0, y = 0, log, flex, visibleBottom, children, ...other }) => {
  r(COMPONENT)

  const [currentY, setCurrentY] = useState(y)
  const [show, setShow] = useState(y && visibleBottom ? y <= visibleBottom : false)
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setCurrentY(event.nativeEvent.layout.y)
  }, [])

  useEffect(() => {
    if (show) return

    /**
     * 通常 key 是 subjectId, 而 y 是通过 height * index 得到的,
     * 为了防止同一个组件在后续重渲染中, y 变小了不会自动判断是否能显示
     */
    if (y && y < currentY) setCurrentY(y)
  }, [show, currentY, y])

  useEffect(() => {
    if (show) return

    if (currentY && visibleBottom + preDistance >= currentY) setShow(true)
  }, [show, visibleBottom, currentY])

  const logText: string[] = []
  if (DEV && log) {
    logText.push(`c:${Math.floor(visibleBottom)}`)
    if (y) {
      logText.push(`y:${Math.floor(y)}`)
    } else {
      logText.push(`cy:${Math.floor(currentY)}`)
    }
    if (index) logText.push(`i:${index}`)
  }

  const Component = flex ? Flex : View
  return (
    // @ts-expect-error
    <Component {...other} collapsable={false} onLayout={y ? undefined : handleLayout}>
      {show ? children : null}
      {log && (
        <Flex style={styles.dev}>
          <Text style={styles.devText} size={8} bold shadow>
            {logText.join(', ')}
          </Text>
        </Flex>
      )}
    </Component>
  )
}
