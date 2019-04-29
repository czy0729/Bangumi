/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:31:16
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppLoading, Asset } from 'expo'
import { Provider } from '@ant-design/react-native'
import Stores from '@stores'
import { colorPlain } from '@styles'
import theme from '@styles/theme'
import Navigations from './navigations'

console.disableYellowBox = true

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('@assets/images/logo.png'),
        require('@assets/components/activity/loading.gif')
      ]),
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPlain
  }
})
