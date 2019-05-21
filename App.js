/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 14:53:36
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  AppLoading
  // Asset
} from 'expo'
import { Provider } from '@ant-design/react-native'
import { WebView } from '@components'
import Stores, { userStore } from '@stores'
import _ from '@styles'
import theme from '@styles/theme'
import Navigations from './navigations'

console.disableYellowBox = true
global.log = (value, space) => {
  const handleCircular = () => {
    const cache = []
    const keyCache = []
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        const index = cache.indexOf(value)
        if (index !== -1) {
          return `[Circular ${keyCache[index]}]`
        }
        cache.push(value)
        keyCache.push(key || 'root')
      }
      return value
    }
  }
  console.log(JSON.stringify(value, handleCircular(), space))
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  loadResourcesAsync = async () =>
    Promise.all([
      // Asset.loadAsync([]),
      Stores.init()
    ])

  handleLoadingError = error => {
    console.warn(error)
  }

  handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true
    })
  }

  // renderWebViewToPassCookie() {
  //   if (!userStore.isWebLogin) {
  //     return null
  //   }

  //   return <WebView uri />
  // }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    }

    return (
      <View style={styles.container}>
        <Provider theme={theme}>
          <Navigations />
        </Provider>
        {/* {this.renderWebViewToPassCookie()} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  }
})
