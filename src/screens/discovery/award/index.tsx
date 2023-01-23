/*
 * 更沉浸的Bgm年鉴
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-22 07:20:02
 */
import React from 'react'
import { View } from 'react-native'
import WebView from '@components/@/web-view'
import { Track, StatusBarEvents, Loading, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { open, appNavigate, info, removeCF } from '@utils'
import { ob } from '@utils/decorators'
import { fetchHTML } from '@utils/fetch'
import { HOST } from '@constants'
import { Navigation } from '@types'
import resetStyle from './reset-style'
import { injectedStaticJavaScript } from './utils'
import { styles } from './styles'

const originWhitelist = ['*'] as const

const lightContentYears = ['2022', '2020', '2016', '2015', '2012', '2011'] as const

const htmlCache = {}

class Award extends React.Component<{
  navigation: Navigation
  route?: {
    params?: {
      uri?: string
    }
  }
}> {
  state = {
    loading: true,
    redirectCount: 0,
    html: ''
  }

  /** 是否已到达目的页面 */
  loaded = false

  /** 跳转次数 */
  redirectCount = 0

  componentDidMount() {
    if (htmlCache[this.year]) {
      this.setState({
        html: htmlCache[this.year]
      })
    } else {
      this.fetch()
    }

    setTimeout(() => {
      this.onLoad()
    }, 3000)
  }

  fetch = async () => {
    try {
      let html = await fetchHTML({
        url: `${HOST}/award/${this.year}`
      })

      // 抹除不必要的元素
      if (this.year != '2022') html = removeCF(html)
      html = html.replace(/>\s+</g, '><')

      if (this.year != '2022') {
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      }

      html = `${html
        .replace(/href="javascript:void\(0\)"/g, '')
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
        resetStyle[this.year]
      }</style><script>${injectedStaticJavaScript}</script>`
      htmlCache[this.year] = html
      this.setState({
        html
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
    open(this.uri)
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

  get uri() {
    const { route } = this.props
    return route?.params?.uri || ''
  }

  get year() {
    const uris = this.uri.split('/')
    return uris[uris.length - 1]
  }

  get barStyle() {
    const { loading } = this.state

    // @ts-expect-error
    if (!loading && lightContentYears.includes(this.year)) return 'dark-content'

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
        <StatusBarEvents
          barStyle={this.barStyle}
          backgroundColor='transparent'
          action='onWillFocus'
        />
        {loading && (
          <Loading style={styles.loading} color={_.__colorPlain__}>
            <Text style={_.mt.md} size={13} type={_.select('plain', 'title')}>
              {redirectCount ? `第${redirectCount}次重试` : '网页加载中, 请稍等'}
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
        <Track title='年鉴' hm={[`award/${this.year}`, 'Award']} />
        <Heatmap id='年鉴' screen='Award' />
        <Heatmap right={80} bottom={40} id='年鉴.跳转' transparent />
      </View>
    )
  }
}

export default ob(Award)
