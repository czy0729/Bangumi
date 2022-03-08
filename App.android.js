/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-08 20:11:15
 */
import '@utils/thirdParty/stable-sort'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

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
          <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Settings' component={SettingsScreen} />
          </Tab.Navigator>
          {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          </Stack.Navigator> */}
        </NavigationContainer>
        <DeepLink />
        <BackAndroid />
        <AppCommon />
      </Provider>
    </SafeAreaProvider>
  )
}
