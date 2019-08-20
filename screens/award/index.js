/*
 * 更沉浸的Bgm年鉴
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 16:22:53
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from '@screens/_'
import { Loading, WebView as CompWebView, Text } from '@components'
import { withHeader, observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { hm } from '@utils/fetch'
import { userStore } from '@stores'
import _ from '@styles'
import { injectedJavaScript } from './utils'

const title = '年鉴'
const redirectMaxCount = 2 // 最大失败跳转次数

export default
@withHeader()
@observer
class Award extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: true,
    redirectCount: 0
  }

  loaded = false // 是否已到达目的页面
  redirectCount = 0 // 跳转次数

  componentDidMount() {
    hm(`award/${this.year}`, title)
  }

  onError = () => {
    const { navigation } = this.props
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onMessage = async event => {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'onload':
          if (data) {
            if (data.href !== uri) {
              const { redirectCount } = this.state
              this.setState(
                {
                  redirectCount: redirectCount + 1
                },
                () => {
                  const { redirectCount } = this.state
                  if (redirectCount > redirectMaxCount) {
                    this.onError()
                  }
                }
              )
            } else {
              this.loaded = true
              this.setState({
                loading: false
              })
            }
          }
          break
        case 'onclick':
          if (data && data.href) {
            appNavigate(data.href, navigation)
          }
          break
        default:
          break
      }
    } catch (ex) {
      this.onError()
    }
  }

  get year() {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const uris = uri.split('/')
    return uris[uris.length - 1]
  }

  render() {
    const { cookie } = userStore.userCookie
    const { navigation } = this.props
    const { loading, redirectCount } = this.state
    const uri = navigation.getParam('uri')
    return (
      <View style={[_.container.flex, styles.dark]}>
        <StatusBar barStyle='light-content' />
        {loading && (
          <Loading
            style={[
              {
                ...StyleSheet.absoluteFill,
                zIndex: 1
              },
              styles.dark
            ]}
            color={_.colorPlain}
          >
            {!!redirectCount && (
              <Text style={_.mt.sm} size={12} type='plain'>
                第 {redirectCount}次 重试
              </Text>
            )}
          </Loading>
        )}
        <CompWebView
          ref={ref => (this.WebView = ref)}
          style={[
            styles.dark,
            {
              paddingTop: _.statusBarHeight
            }
          ]}
          uri={uri}
          thirdPartyCookiesEnabled
          injectedJavaScript={injectedJavaScript({
            uri,
            cookie,
            redirectMaxCount,
            year: this.year
          })}
          onError={this.onError}
          onMessage={this.onMessage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: 'rgb(0, 0, 0)'
  }
})
