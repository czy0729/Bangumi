import React from 'react'
import { AsyncStorage } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { ExpoConfigView } from '@expo/samples'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json'
  }

  async componentDidMount() {
    await AsyncStorage.clear()
    Toast.info('AsyncStorage cleared')
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />
  }
}
