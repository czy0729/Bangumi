/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-14 17:17:27
 */
import React from 'react'
import { View } from 'react-native'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from '@ant-design/react-native'
import { AppCommon } from '@screens/_'
import Stores, { _ } from '@stores'
import { bootApp } from '@utils/app'
import { observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import theme from '@styles/theme'
import Navigations from './navigations/index'

bootApp()

export default
@observer
class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  componentDidCatch(error) {
    hm(`error?error=${error}`, '错误')
  }

  loadResourcesAsync = () =>
    Promise.all([
      Stores.init(),
      Font.loadAsync({
        bgm: require('./assets/fonts/AppleColorEmoji.ttf')
      })
    ])

  handleLoadingError = error => console.warn(error)

  handleFinishLoading = () =>
    this.setState({
      isLoadingComplete: true
    })

  render() {
    const { skipLoadingScreen } = this.props
    const { isLoadingComplete } = this.state
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onFinish={this.handleFinishLoading}
          onError={this.handleLoadingError}
        />
      )
    }

    return (
      <View style={this.styles.container}>
        <Provider theme={theme}>
          <Navigations />
        </Provider>
        <AppCommon />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorBg
  }
}))
