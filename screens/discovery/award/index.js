/*
 * 更沉浸的Bgm年鉴
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-19 17:22:56
 */
import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import { StatusBarEvents, Loading, Text } from '@components'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { hm } from '@utils/fetch'
import { HOST } from '@constants'
import _ from '@styles'
import staticHTML from './static-html'

export default
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
    hm(`award/${this.year}`, 'Award')
  }

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

  onMessage = async event => {
    const { navigation } = this.props
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
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

  onLoad = () => {
    this.setState({
      loading: false
    })
  }

  get year() {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const uris = uri.split('/')
    return uris[uris.length - 1]
  }

  get barStyle() {
    const { loading } = this.state
    if (!loading && ['2016', '2015', '2012', '2011'].includes(this.year)) {
      return 'dark-content'
    }
    return 'light-content'
  }

  render() {
    const { loading, redirectCount } = this.state
    return (
      <View style={[_.container.flex, styles.dark]}>
        <StatusBarEvents
          barStyle={this.barStyle}
          backgroundColor='transparent'
          action='onWillFocus'
        />
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
            <Text style={_.mt.md} size={12} type='plain'>
              {redirectCount
                ? `第${redirectCount}次重试`
                : '网页加载中, 请稍等'}
            </Text>
            <Text
              style={[
                _.mt.sm,
                {
                  opacity: 0.6
                }
              ]}
              size={10}
              type='plain'
              onPress={this.onOpen}
            >
              或点这里使用浏览器打开
            </Text>
          </Loading>
        )}
        <WebView
          style={[
            styles.dark,
            {
              paddingTop: _.statusBarHeight
            }
          ]}
          useWebKit
          thirdPartyCookiesEnabled={false}
          originWhitelist={['*']}
          source={{ html: staticHTML(this.year), baseUrl: HOST }}
          onLoad={this.onLoad}
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
