/*
 * @Author: czy0729
 * @Date: 2023-07-20 12:26:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:04:37
 */
import { useCallback, useEffect, useState } from 'react'
import { AppState } from 'react-native'

import type { AppStateStatus } from 'react-native'

/**
 * 自定义 Hook，用于获取当前应用状态（如：后台、前台等）。
 *
 * @returns 如果应用处于前台返回 true，否则返回 false。
 */
export default function useAppState(): boolean {
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
