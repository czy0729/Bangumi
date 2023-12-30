/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:13:09
 */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'

/** 提前渲染的 y 轴距离 */
const PRE_DISTANCE = _.window.height * 2

export default ({ y = 0, log, flex, visibleBottom, children, ...other }) => {
  const [top, setTop] = useState(y)
  const [show, setShow] = useState(false)

  const onLayout = useCallback(
    ({ nativeEvent }) => {
      const { layout } = nativeEvent
      if (layout.y) setTop(layout.y)
      if (log) console.info('layout.height', log, layout.height)
    },
    [log]
  )

  useEffect(() => {
    if (show) return
    if (top && visibleBottom + PRE_DISTANCE >= top) setShow(true)
  }, [show, visibleBottom, top])

  const Component = flex ? Flex : View
  return (
    // @ts-expect-error
    <Component {...other} onLayout={onLayout}>
      {show ? children : null}
    </Component>
  )
}
