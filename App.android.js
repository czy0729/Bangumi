/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 15:31:33
 */
import React from 'react'
import { View } from 'react-native'
import { useScreens } from 'react-native-screens'
import SplashScreen from 'react-native-splash-screen'
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
if (!DEV) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  }
}

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

  closeImageViewer = () => {
    systemStore.closeImageViewer()
  }

  render() {
    const { isLoadingComplete } = this.state
    if (!isLoadingComplete) {
      return null
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
