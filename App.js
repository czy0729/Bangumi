/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-12 16:33:46
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useScreens } from 'react-native-screens'
import { AppLoading } from 'expo'
import { Provider } from '@ant-design/react-native'
import { ImageViewer } from '@components'
import { StatusBar } from '@screens/_'
import Stores, { systemStore } from '@stores'
import { observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import theme from '@styles/theme'
import Navigations from './navigations/index'

// https://reactnavigation.org/docs/zh-Hans/react-native-screens.html
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

export default
@observer
class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  componentDidCatch(error) {
    hm(`error?error=${error}`, '错误')
  }

  loadResourcesAsync = async () =>
    Promise.all([
      Stores.init()
      // Asset.loadAsync([]),
      // Font.loadAsync({
      //   bgm: require('./assets/fonts/NotoColorEmoji.ttf')
      // })
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
      <View style={styles.container}>
        <StatusBar />
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
