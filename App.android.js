/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 21:24:30
 */
import '@utils/thirdParty/stable-sort'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import Provider from '@ant-design/react-native/lib/provider'
import { NavigationContainer, DeepLink, BackAndroid } from '@components'
import { AppCommon } from '@screens/_'
import { _ } from '@stores'
import {
  useCachedResources,
  useKeepAwake,
  useOrientation,
  useErrorHandlerAndroid
} from '@utils/hooks'
import theme from '@styles/theme'
import { Home, Subject } from '@screens'

const Stack = createStackNavigator()

export default function App() {
  const isLoadingComplete = useCachedResources()
  useKeepAwake()
  useErrorHandlerAndroid()

  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])

  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>
        {/* {createNavigator()} */}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              }}
            />
            <Stack.Screen
              name='Subject'
              component={Subject}
              options={{
                ...Subject.navigationOptions,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <DeepLink />
        <BackAndroid />
        <AppCommon />
      </Provider>
    </SafeAreaProvider>
  )
}
