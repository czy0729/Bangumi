/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 13:54:53
 */
import React from 'react'
import { YellowBox, StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import { Provider } from '@ant-design/react-native'
import { ImageViewer } from '@components'
import { StatusBar } from '@screens/_'
import Stores, { systemStore } from '@stores'
import { observer } from '@utils/decorators'
import _ from '@styles'
import theme from '@styles/theme'
import Navigations from './navigations/index'

console.disableYellowBox = true
// YellowBox.ignoreWarnings([
//   '[Unhandled promise rejection:',
//   'Warning: Can\'t call setState (or forceUpdate)'
// ])

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
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
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
