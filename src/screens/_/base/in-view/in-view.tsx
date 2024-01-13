/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:21:50
 */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, PRE_DISTANCE } from './ds'

export default ({ y = 0, log, flex, visibleBottom, children, ...other }) => {
  r(COMPONENT)

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
