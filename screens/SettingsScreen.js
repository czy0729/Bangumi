import React from 'react'
import { AsyncStorage } from 'react-native'
import { CacheManager } from 'react-native-expo-image-cache'
import { Toast } from '@ant-design/react-native'
import { ExpoConfigView } from '@expo/samples'
import { userStore } from '@stores'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json'
  }

  async componentDidMount() {
    await AsyncStorage.clear()
    await CacheManager.clearCache()
    userStore.setStorage('accessToken')
    userStore.setStorage('userInfo')
    Toast.info('AsyncStorage cleared')
  }

  render() {
    return <ExpoConfigView />
  }
}
