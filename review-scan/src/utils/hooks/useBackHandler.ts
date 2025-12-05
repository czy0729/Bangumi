/*
 * @Author: czy0729
 * @Date: 2022-01-25 15:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 21:25:59
 */
import { useEffect } from 'react'
import { BackHandler } from 'react-native'

/**
 * 自定义 Hook，用于处理物理返回键事件。
 *
 * @param {() => boolean} handler - 处理返回键按下事件的回调函数，返回`true`时阻止默认行为，返回`false`时允许默认行为。
 */
export default function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler)

    return () => subscription.remove()
  }, [handler])
}
