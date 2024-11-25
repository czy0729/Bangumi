/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 20:32:27
 */
import React, { useCallback, useEffect, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT } from './ds'

/** 提前渲染的 y 轴距离 */
let preDistance = 0
if (!DEV) {
  setTimeout(() => {
    preDistance = _.window.height * 0.5
  }, 20000)
}

export default ({ y = 0, log, flex, visibleBottom, children, ...other }) => {
  r(COMPONENT)

  const [currentY, setCurrentY] = useState(y)
  const [show, setShow] = useState(y && visibleBottom ? y <= visibleBottom : false)
  const onLayout = useCallback((event: LayoutChangeEvent) => {
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

  if (log) console.info('InView', visibleBottom, y, show)

  const Component = flex ? Flex : View
  return (
    // @ts-expect-error
    <Component {...other} onLayout={y ? undefined : onLayout}>
      {show ? children : null}
    </Component>
  )
}
