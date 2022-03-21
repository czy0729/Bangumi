/*
 * @Author: czy0729
 * @Date: 2022-03-07 21:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-21 22:27:55
 */
import { useEffect } from 'react'
import { Alert } from 'react-native'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler'
import RNRestart from 'react-native-restart'
import { err } from '../fetch'

export default function useErrorHandlerAndroid() {
  useEffect(() => {
    setJSExceptionHandler(errorHandler)
    setNativeExceptionHandler(() => {})
  }, [])
}

function errorHandler(e, isFatal) {
  if (isFatal) {
    err(`${e.name} ${e.message}`)

    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
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
