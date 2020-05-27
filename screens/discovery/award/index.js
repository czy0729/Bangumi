/*
 * 更沉浸的Bgm年鉴
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 17:26:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from '@components/@/web-view'
import { StatusBarEvents, Loading, Text, UM } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { hm, xhrCustom, fetchHTML } from '@utils/fetch'
import { removeCF } from '@utils/html'
import { HOST } from '@constants'
import { CDN_AWARD } from '@constants/cdn'
import resetStyle from './reset-style'
import { injectedStaticJavaScript } from './utils'

const title = '年鉴'
const originWhitelist = ['*']
const lightContentYears = ['2016', '2015', '2012', '2011']
const htmlCache = {}

export default
@observer
class Award extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: true,
    redirectCount: 0,
    html: ''
  }

  loaded = false // 是否已到达目的页面
  redirectCount = 0 // 跳转次数

  componentDidMount() {
    if (htmlCache[this.year]) {
      this.setState({
        html: htmlCache[this.year]
      })
    } else {
      this.fetchHTML()
    }

    hm(`award/${this.year}`, 'Award')
  }

  fetchHTML = async () => {
    if (this.year == 2019) {
      this.fetch2019()
      return
    }

    try {
      const { _response } = await xhrCustom({
        url: CDN_AWARD(this.year)
      })
      const { html } = JSON.parse(_response)
      htmlCache[this.year] = html
      this.setState({
        html
      })
    } catch (error) {
      warn('discovery/award/index.js', 'fetchHTML', error)
    }
  }

  fetch2019 = async () => {
    try {
      const html = await fetchHTML({
        url: `${HOST}/award/2019`
      })

      this.setState({
        html: `${removeCF(html)
          .replace(/>\s+</g, '><')
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(
            /<div id="headerNeue2">(.+?)<div id="awardWrapper"/g,
            '<div id="awardWrapper"'
          )
          .replace(/<div class="shareBtn">(.+?)<\/div>/, '')
          .replace(/<div id="dock">(.+?)<div id="robot"/g, '<div id="robot"')
          .replace(
            /<div id="main" class="png_bg"><div id="footer">(.+?)<\/div><div class="homeBg">/g,
            '</div><div class="homeBg">'
          )}<style>${
          resetStyle[2019]
        }</style><script>${injectedStaticJavaScript}</script>`
      })
    } catch (error) {
      this.onError()
    }
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
            appNavigate(
              data.href,
              navigation,
              {},
              {
                id: '年鉴.跳转',
                data: {
                  year: this.year
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

  onLoad = () =>
    this.setState({
      loading: false
    })

  get year() {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const uris = uri.split('/')
    return uris[uris.length - 1]
  }

  get barStyle() {
    const { loading } = this.state
    if (!loading && lightContentYears.includes(this.year)) {
      return 'dark-content'
    }
    return 'light-content'
  }

  get source() {
    const { html } = this.state
    return {
      html,
      baseUrl: HOST
    }
  }

  render() {
    const { loading, redirectCount, html } = this.state
    return (
      <View style={styles.container}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle={this.barStyle}
          backgroundColor='transparent'
          action='onWillFocus'
        />
        {loading && (
          <Loading style={styles.loading} color={_.__colorPlain__}>
            <Text style={_.mt.md} size={13} type={_.select('plain', 'title')}>
              {redirectCount
                ? `第${redirectCount}次重试`
                : '网页加载中, 请稍等'}
            </Text>
            <Text
              style={styles.extra}
              size={10}
              type={_.select('plain', 'title')}
              onPress={this.onOpen}
            >
              或点这里使用浏览器打开
            </Text>
          </Loading>
        )}
        {!!html && (
          <WebView
            style={styles.webview}
            useWebKit
            thirdPartyCookiesEnabled={false}
            originWhitelist={originWhitelist}
            source={this.source}
            onLoad={this.onLoad}
            onError={this.onError}
            onMessage={this.onMessage}
          />
        )}
      </View>
    )
  }
}

const backgroundColor = 'rgb(0, 0, 0)'
const styles = StyleSheet.create({
  container: {
    ..._.container.flex,
    backgroundColor
  },
  loading: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    backgroundColor
  },
  extra: {
    ..._.mt.sm,
    opacity: 0.6
  },
  webview: {
    paddingTop: _.statusBarHeight,
    backgroundColor
  }
})
