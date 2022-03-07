/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 22:43:10
 */
import React, { useEffect } from 'react'
import * as ReactNativeScreens from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Provider from '@ant-design/react-native/lib/provider'
import { DeepLink } from '@components'
import { HoldMenuProvider } from '@components/@/react-native-hold-menu'
import { AppCommon } from '@screens/_'
import { _ } from '@stores'
import { useCachedResources, useOrientation } from '@utils/hooks'
import theme from '@styles/theme'
import { Home, Subject, Notify } from '@screens'
// import { createNavigator } from './src/navigations/index'

ReactNativeScreens.enableScreens()

const Stack = createNativeStackNavigator()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])
  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>
        <HoldMenuProvider>
          {/* {createNavigator()} */}
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen
                name='Subject'
                component={Subject}
                opition={Subject.navigationOptions}
              />
              <Stack.Screen name='Notify' component={Notify} />
            </Stack.Navigator>
          </NavigationContainer>
        </HoldMenuProvider>
        <DeepLink />
        <AppCommon />
      </Provider>
    </SafeAreaProvider>
  )
}
