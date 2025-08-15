/*
 * @Author: czy0729
 * @Date: 2023-07-20 12:26:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-20 14:49:07
 */
import { useCallback, useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

/**
 * 自定义 Hook，用于获取当前应用状态（如：后台、前台等）。
 *
 * @returns {boolean} 如果应用处于前台返回 true，否则返回 false。
 */
export default function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState)

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    setAppState(nextAppState)
  }, [])

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      appStateSubscription.remove()
    }
  }, [handleAppStateChange])

  return appState === 'active'
}
