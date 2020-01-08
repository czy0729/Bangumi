/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-08 10:47:12
 */
import React from 'react'
import { View } from 'react-native'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider } from '@ant-design/react-native'
import { ImageViewer } from '@components'
import Stores, { _, systemStore } from '@stores'
import { bootApp } from '@utils/app'
import { globalLog, globalWarn } from '@utils/dev'
import { observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import theme from '@styles/theme'
import Navigations from './navigations/index'

bootApp()
global.log = globalLog
global.warn = globalWarn

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
