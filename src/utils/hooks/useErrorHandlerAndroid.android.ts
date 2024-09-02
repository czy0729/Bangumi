/*
 * @Author: czy0729
 * @Date: 2022-03-07 21:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:20:44
 */
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'
import RNRestart from 'react-native-restart'
import { FROZEN_FN } from '@constants/init'
import { getTimestamp } from '../date'
import { err } from '../fetch'
import { update } from '../kv'

export default function useErrorHandlerAndroid() {
  useEffect(() => {
    setJSExceptionHandler(errorHandler)
    setNativeExceptionHandler(FROZEN_FN)
  }, [])
}

function errorHandler(e: Error, isFatal: boolean) {
  if (isFatal) {
    const id = getTimestamp()
    update(`stack_${id}`, e.stack)
    err(`stackId:${id} ${e.name} ${e.message}`)

    Alert.alert(
      '致命错误',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        很抱歉，需要重新启动。若此错误稳定触发，恳请截取此屏幕并告知作者，谢谢！
        `,
      [
        {
          text: '重启',
          onPress: () => RNRestart.Restart()
        }
      ]
    )
  }
}
