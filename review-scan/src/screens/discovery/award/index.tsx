/*
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:26:09
 */
import React from 'react'
import { Component, Page } from '@components'
import { appNavigate, cheerio, getStorage, info, open, removeCF, setStorage } from '@utils'
import { ob } from '@utils/decorators'
import { fetchHTML, t } from '@utils/fetch'
import { HOST, WEB } from '@constants'
import Extra from './component/extra'
import Loading from './component/loading'
import WebView from './component/web-view'
import resetStyle from './reset-style'
import { injectedStaticJavaScript } from './utils'
import { LIGHT_CONTENT_YEARS, NAMESPACE } from './ds'
import { styles } from './styles'
import { Props } from './types'

const HTML_CACHE = {}

/** 更沉浸的 Bgm 年鉴 */
class Award extends React.Component<Props> {
  state = {
    loading: true,
    redirectCount: 0,
    html: ''
  }

  /** 是否已到达目的页面 */
  loaded = false

  /** 跳转次数 */
  redirectCount = 0

  async componentDidMount() {
    const html = HTML_CACHE[this.uri]
    if (html) {
      this.setState({
        html
      })
      this.onLoad()
      return
    }

    // 网页版通常都是没登录的, 为了减少大请求, 直接缓存网页结果
    if (WEB) {
      const cache: string = (await getStorage(`${NAMESPACE}|html|${this.year}`)) || ''
      if (cache) {
        this.setState({
          html: cache
        })
        this.onLoad()
        return
      }
    }

    this.fetch()
    setTimeout(() => {
      this.onLoad()
    }, 3000)
  }

  fetch = async () => {
    try {
      let url = `${HOST}/award/${this.year}`
      if (this.uri.includes('/winner')) url += '/winner'

      let html = await fetchHTML({
        url
      })

      // 抹除不必要的元素
      if (this.year != '2022') html = removeCF(html)
      html = html.replace(/>\s+</g, '><')

      if (this.year != '2022' && this.year != '2023') {
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      }

      html = `${html
        .replace(/href="javascript:void\(0\)"/g, '')
        .replace(/<div id="headerNeue2">(.+?)<div id="awardWrapper"/g, '<div id="awardWrapper"')
        .replace(/<div class="shareBtn">(.+?)<\/div>/, '')
        .replace(/<div id="dock">(.+?)<div id="robot"/g, '<div id="robot"')
        .replace(
          /<div id="main" class="png_bg"><div id="footer">(.+?)<\/div><div class="homeBg">/g,
          '</div><div class="homeBg">'
        )
        .replace(/\/r\/400\/pic/g, '/r/200/pic')}<style>${
        resetStyle[this.year]
      }</style><script>${injectedStaticJavaScript}</script>`.replace(/\/r\/400\/pic/g, '/r/200/pic')
      HTML_CACHE[this.uri] = html
      this.setState({
        html
      })

      if (WEB) setStorage(`${NAMESPACE}|html|${this.uri}`, html)
    } catch (error) {
      this.onError()
    }
  }

  onError = () => {
    this.props.navigation.goBack()
    info('网络似乎出了点问题，请重试')

    t('年鉴.错误', {
      uri: this.uri
    })
  }

  onOpen = () => {
    open(this.uri)

    t('年鉴.浏览器打开', {
      uri: this.uri
    })
  }

  onMessage = async (event: any) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'onclick':
          this.onDirect(data)
          break

        default:
          break
      }
    } catch (ex) {
      this.onError()
    }
  }

  onDirect = (data: { href?: string; innerHTML?: string; nextInnerHTML?: string }) => {
    if (data?.href) {
      const { navigation } = this.props
      const { href, innerHTML, nextInnerHTML } = data

      const params: any = {}
      if (href.includes('/subject/')) {
        if (innerHTML) {
          params._image = cheerio(innerHTML)('img').attr('src') || ''
        }
        if (nextInnerHTML) {
          const $ = cheerio(nextInnerHTML)
          params._jp = $('.title').text().trim()
          params._cn = $('.subtitle').text().trim()
        }
      }

      const event = {
        id: '年鉴.跳转',
        data: {
          year: this.year
        }
      } as const

      appNavigate(href, navigation, params, event)
    }
  }

  onLoad = () => {
    this.setState({
      loading: false
    })
  }

  get uri() {
    return this.props.route?.params?.uri || ''
  }

  get year() {
    const uris = this.uri.replace('/winner', '').split('/')
    return uris[uris.length - 1]
  }

  get barStyle() {
    if (!this.state.loading && (LIGHT_CONTENT_YEARS as readonly string[]).includes(this.year)) {
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
      <Component id='screen-award'>
        <Page style={styles.container}>
          {loading && <Loading redirectCount={redirectCount} onOpen={this.onOpen} />}
          {!!html && (
            <WebView
              year={this.year}
              source={this.source}
              onLoad={this.onLoad}
              onError={this.onError}
              onMessage={this.onMessage}
            />
          )}
          <Extra year={this.year} />
        </Page>
      </Component>
    )
  }
}

export default ob(Award)
