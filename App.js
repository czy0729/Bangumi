/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 04:54:50
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppLoading, Asset } from 'expo'
import { Provider } from '@ant-design/react-native'
import theme from '@styles/theme'
import AppNavigator from './navigation/AppNavigator'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  _loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('@assets/images/logo.png'),
        require('@assets/components/activity/loading.gif')
      ])
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      // })
    ])

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    }
    return (
      <View style={styles.container}>
        <Provider theme={theme}>
          <AppNavigator />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
