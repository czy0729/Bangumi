/*
 * @Author: czy0729
 * @Date: 2023-07-20 12:26:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-20 14:49:07
 */
import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export default function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      setAppState(nextAppState)
    }

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      appStateSubscription.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return appState === 'active'
}
