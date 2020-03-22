/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-14 17:09:31
 */
import React from 'react'
import { Alert, View } from 'react-native'
import RNRestart from 'react-native-restart'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler'
import SplashScreen from 'react-native-splash-screen'
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

  componentDidMount() {
    this.loadResourcesAsync()
  }

  componentDidCatch(error) {
    hm(`error?error=${error}`, '错误')
  }

  loadResourcesAsync = async () => {
    const res = Promise.all([Stores.init()])
    await res

    this.handleFinishLoading()
    Promise.all([
      Font.loadAsync({
        bgm: require('./assets/fonts/AppleColorEmoji.ttf')
      })
    ])

    return res
  }

  handleLoadingError = error => {
    console.warn(error)
  }

  handleFinishLoading = () => {
    this.setState(
      {
        isLoadingComplete: true
      },
      () => {
        // eslint-disable-next-line no-unused-expressions
        SplashScreen && SplashScreen.hide && SplashScreen.hide()
      }
    )
  }

  render() {
    const { isLoadingComplete } = this.state
    if (!isLoadingComplete) {
      return null
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

/**
 * 崩溃处理
 * @param {*} e
 * @param {*} isFatal
 */
function errorHandler(e, isFatal) {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
        `,
      [
        {
          text: '重启',
          onPress: () => {
            RNRestart.Restart()
          }
        }
      ]
    )
  }
}

setJSExceptionHandler(errorHandler)

setNativeExceptionHandler(() => {})
