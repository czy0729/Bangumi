/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-13 17:56:33
 */
import React from 'react'
import { View } from 'react-native'
import { useScreens } from 'react-native-screens'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from '@ant-design/react-native'
import { ImageViewer } from '@components'
import Stores, { _, systemStore } from '@stores'
import { observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { DEV } from '@constants'
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
  if (!DEV) {
    return
  }

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
 * try catch 打印警告
 */
global.warn = (key, method, error) => {
  if (!DEV) {
    return
  }
  console.warn(`[${key}] ${method}`, error)
}

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
      // Asset.loadAsync([]),
      Font.loadAsync({
        bgm: require('./assets/fonts/AppleColorEmoji.ttf')
      })
    ])

  handleLoadingError = error => {
    console.warn(error)
  }

  handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true
    })
  }

  closeImageViewer = () => {
    systemStore.closeImageViewer()
  }

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

    const { visible, imageUrls } = systemStore.imageViewer
    return (
      <View style={this.styles.container}>
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
