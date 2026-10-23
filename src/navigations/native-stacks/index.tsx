/*
 * @Author: czy0729
 * @Date: 2023-07-28 15:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-22 12:00:00
 *
 * 原生栈导航: 注册首页标签容器与全部页面 (开发环境可跳过与初始路由无关的首页)
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { urlStringify } from '@utils'
import { DEV } from '@constants'
import * as Screens from '@screens'
import navigationsParams from '@src/config'
import BottomTabNavigator from '../bottom-tab-navigator'
import NavigationContainer from '../navigation-container'
import { getOptions, getScreenOptions, Placeholder, useAutoHideSplashScreen } from './utils'

import type { ComponentType } from 'react'

const Stack = createNativeStackNavigator()

/** 页面组件表 */
const SCREENS = Screens as unknown as Record<string, ComponentType>

function NativeStacks({ isLoadingComplete }: { isLoadingComplete: boolean }) {
  const { isFullScreen, hideSplashScreen } = useAutoHideSplashScreen()
  const { initialRouteName, initialRouteParams } = navigationsParams
  const isReady = isLoadingComplete && hideSplashScreen

  /** 开发环境且初始路由不是首页 */
  const isDevNonHomeStart = DEV && initialRouteName !== 'HomeTab'

  /** 开发时跳过首页注册 (此时不能 navigate 到 HomeTab) */
  const skipHomeTab = isDevNonHomeStart && !!initialRouteName

  const handleGetComponent = useCallback(
    () => (isReady ? BottomTabNavigator : Placeholder),
    [isReady]
  )

  /** 页面唯一键 */
  const handleGetId = useCallback(({ params }: { params: object }): string | undefined => {
    if (!params) return undefined

    return urlStringify(params as Record<string, string | number | boolean>)
  }, [])

  /** 页面列表 (避免每次渲染重建) */
  const elScreens = useMemo(() => {
    if (!isReady && !isDevNonHomeStart) return null

    return Object.keys(SCREENS).map(name => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => (isLoadingComplete ? SCREENS[name] : Placeholder)}
        initialParams={initialRouteName === name ? initialRouteParams : undefined}
        options={getOptions(name)}
        getId={handleGetId}
      />
    ))
  }, [isReady, isDevNonHomeStart, initialRouteName, initialRouteParams, isLoadingComplete, handleGetId])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={getScreenOptions(isFullScreen)}
        initialRouteName={initialRouteName}
      >
        {!skipHomeTab && <Stack.Screen name='HomeTab' getComponent={handleGetComponent} />}
        {elScreens}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default observer(NativeStacks)
