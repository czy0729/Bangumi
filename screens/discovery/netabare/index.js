/*
 * @Author: czy0729
 * @Date: 2020-05-27 15:15:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 15:32:33
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from '@components/@/web-view'
import { StatusBarEvents, UM } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { info } from '@utils/ui'

const title = '评分趋势'

export default
@observer
class Netabare extends React.Component {
  static navigationOptions = {
    header: null
  }

  webview = null

  onLoad = () => {}

  onError = () => {
    const { navigation } = this.props
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onOpen = () => {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    open(uri)
  }

  onError = () => {
    const { navigation } = this.props
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onMessage = async event => {
    const { navigation } = this.props
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'onclick':
          if (data && data.href) {
            appNavigate(
              data.href,
              navigation,
              {},
              {
                id: 'Netabare.跳转',
                data: {
                  href: data.href
                }
              }
            )
          }
          break
        default:
          break
      }
    } catch (ex) {
      this.onError()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='dark-content'
          backgroundColor='transparent'
          action='onWillFocus'
        />
        <WebView
          ref={ref => (this.webview = ref)}
          style={styles.webview}
          source={{
            uri: 'https://netaba.re/trending'
          }}
          onLoad={this.onLoad}
          onError={this.onError}
          onMessage={this.onMessage}
        />
      </View>
    )
  }
}

const backgroundColor = 'rgb(255, 255, 255)'
const styles = StyleSheet.create({
  container: {
    ..._.container.flex,
    backgroundColor
  },
  webview: {
    paddingTop: _.statusBarHeight,
    backgroundColor
  }
})
