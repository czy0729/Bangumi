/*
 * @Author: czy0729
 * @Date: 2022-03-07 21:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 22:22:37
 */
import { useEffect } from 'react'
import { Alert } from 'react-native'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler'
import RNRestart from 'react-native-restart'
import { getUserStoreAsync } from '../async'
import { t } from '../fetch'

export default function useErrorHandlerAndroid() {
  useEffect(() => {
    setJSExceptionHandler(errorHandler)
    setNativeExceptionHandler(() => {})
  }, [])
}

function errorHandler(e, isFatal) {
  if (isFatal) {
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

    t('其他.崩溃', {
      error: `${e.name} ${e.message}`,
      id: getUserStoreAsync()?.myId || ''
    })
  }
}
