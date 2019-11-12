/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-11 01:00:41
 */
import React from 'react'
import {
  StyleSheet,
  View
  // NativeModules
} from 'react-native'
import { useScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'
import * as Font from 'expo-font'
import { Provider } from '@ant-design/react-native'
import { ImageViewer } from '@components'
import Stores, { systemStore } from '@stores'
import { observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import theme from '@styles/theme'
import Navigations from './navigations/index'

/**
 * https://reactnavigation.org/docs/zh-Hans/react-native-screens.html
 */
useScreens()

console.disableYellowBox = true

/**
 * 能打印循环引用
 */
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

/**
 * 马上隐藏SplashScreen
 */
// const { ExponentSplashScreen: SplashScreen = {} } = NativeModules
// export function preventAutoHide() {
//   if (SplashScreen.preventAutoHide) {
//     SplashScreen.preventAutoHide()
//   }
// }
// export function hide() {
//   if (SplashScreen.hide) {
//     SplashScreen.hide()
//   }
// }

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
    const res = Promise.all([
      Stores.init()
      // Asset.loadAsync([]),
      // Font.loadAsync({
      //   bgm: require('./assets/fonts/AppleColorEmoji.ttf')
      // })
    ])
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

  closeImageViewer = () => {
    systemStore.closeImageViewer()
  }

  render() {
    // const { skipLoadingScreen } = this.props
    const { isLoadingComplete } = this.state
    if (!isLoadingComplete) {
      return null
    }

    // if (!isLoadingComplete && !skipLoadingScreen) {
    //   return (
    //     <AppLoading
    //       startAsync={this.loadResourcesAsync}
    //       onFinish={this.handleFinishLoading}
    //       onError={this.handleLoadingError}
    //     />
    //   )
    // }

    const { visible, imageUrls } = systemStore.imageViewer
    return (
      <View style={styles.container}>
        <Provider theme={theme}>
          <Navigations />
        </Provider>
        <ImageViewer
          visible={visible}
          imageUrls={imageUrls}
          onCancel={this.closeImageViewer}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _.colorBg
  }
})
