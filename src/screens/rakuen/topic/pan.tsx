/*
 * 获取手指最近一次点击相对于屏幕的坐标
 *
 * @Author: czy0729
 * @Date: 2022-08-13 09:58:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-13 18:27:44
 */
import React from 'react'
import { View } from 'react-native'
import {
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  State
} from 'react-native-gesture-handler'
// import { useIsFocused } from '@react-navigation/native'
import { _, uiStore } from '@stores'

function Tap({ children }) {
  // const isFocused = useIsFocused()
  // useEffect(() => {
  //   if (!isFocused) uiStore.closePopableSubject()
  // }, [isFocused])

  return (
    <TapGestureHandler
      enabled
      onHandlerStateChange={(event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.END) {
          uiStore.setXY(event.nativeEvent.absoluteX, event.nativeEvent.absoluteY)
        }
      }}
    >
      <View style={_.container.flex}>{children}</View>
    </TapGestureHandler>
  )
}

export default Tap
