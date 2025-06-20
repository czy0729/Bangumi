/*
 * @Author: czy0729
 * @Date: 2025-06-20 16:16:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-21 00:45:33
 */
import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, NativeModules } from 'react-native'
import { Props as ListenSharedTextProps } from './types'

export { ListenSharedTextProps }

const { TextShareModule } = NativeModules

/** 处理从安卓分享的文本组件 */
export const ListenSharedText = ({ children, onTextReceived, render }: ListenSharedTextProps) => {
  const [sharedText, setSharedText] = useState<string | null>(null)

  // 获取冷启动时的分享文本
  useEffect(() => {
    TextShareModule.getSharedText().then((text: string | null) => {
      if (text) {
        setSharedText(text)
        onTextReceived?.(text)
      }
    })
  }, [onTextReceived])

  // 监听热启动时的分享事件
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      'onTextShared',
      (event: { text: string }) => {
        setSharedText(event.text)
        onTextReceived?.(event.text)
      }
    )

    return () => subscription.remove()
  }, [onTextReceived])

  const clearSharedText = () => {
    setSharedText(null)
  }

  const renderProps = { sharedText, clearSharedText }

  // 优先使用 render prop，然后是 children，最后返回 null
  if (render) return <>{render(renderProps)}</>

  if (children) return <>{children(renderProps)}</>

  return null
}
