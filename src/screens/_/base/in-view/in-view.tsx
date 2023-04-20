/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:44:48
 */
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Flex } from '@components'

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
    if (top && visibleBottom >= top) setShow(true)
  }, [show, visibleBottom, top])

  const Component = flex ? Flex : View
  return (
    // @ts-expect-error
    <Component {...other} onLayout={!log && top ? undefined : onLayout}>
      {show ? children : null}
    </Component>
  )
}
