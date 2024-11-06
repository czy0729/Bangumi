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
import { runAfter } from '@utils'
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

  const [top, setTop] = useState(y)
  const [show, setShow] = useState(false)
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout
      runAfter(() => {
        if (y) setTop(y)
        if (log) console.info('layout.height', log, height)
      }, true)
    },
    [log]
  )

  useEffect(() => {
    if (show) return

    if (y && y < top) setTop(y)
  }, [show, top, y])

  useEffect(() => {
    if (show) return

    if (top && visibleBottom + preDistance >= top) setShow(true)
  }, [show, visibleBottom, top])

  const Component = flex ? Flex : View
  return (
    // @ts-expect-error
    <Component {...other} onLayout={onLayout}>
      {show ? children : null}
    </Component>
  )
}
