/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:51:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:26:58
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from '@components/@/web-view'
import { Loading, Text } from '@components'
import { _, tinygrailStore } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { HOST_CDN } from '@constants/cdn'
import html from './html'
import { getKData } from './utils'

const H_WEBVIEW = Math.min(_.window.height * 0.64, 480)
let renderCount = 0

export default
@obc
class KLine extends React.Component {
  static defaultProps = {
    focus: false
  }

  componentDidMount() {
    renderCount += 1
  }

  onError = () => {
    const { navigation } = this.context
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onLoad = () => {
    const { $ } = this.context
    const { focus } = this.props

    if (focus) {
      setTimeout(() => {
        $.setState({
          loading: false
        })
        tinygrailStore.updateWebViewShow(true)
      }, 400)
    }
  }

  get coverStyle() {
    return {
      upColor: _.colorBid,
      downColor: _.colorAsk,
      bgColor: _.colorTinygrailBg,
      ma5Color: _.colorTinygrailPrimary,
      ma10Color: '#da6ee8',
      ma20Color: _.colorWarning,
      ma30Color: _.colorMain,
      maTextColor: _.colorTinygrailText,
      dateTextColor: _.colorTinygrailText,
      axisNumColor: _.colorTinygrailText,
      zoomColor: _.colorTinygrailIcon,
      zoomTextColor: _.colorTinygrailText,
      zoomBorderColor: _.colorTinygrailIcon
    }
  }

  render() {
    const { $ } = this.context
    const { loading, distance } = $.state
    const { _webview } = tinygrailStore.state
    return (
      <View style={this.styles.chart}>
        {!!$.kline._loaded && (
          <WebView
            key={renderCount}
            style={this.styles.webview}
            useWebKit
            originWhitelist={['*']}
            source={{
              html: html(
                JSON.stringify(getKData($.kline.data, distance)),
                this.coverStyle,
                _
              ),
              baseUrl: HOST_CDN
            }}
            bounces={false}
            scrollEnabled={false}
            onLoad={this.onLoad}
            onError={this.onError}
          />
        )}
        {(!_webview || loading) && (
          <Loading style={this.styles.loading} color={_.colorTinygrailText}>
            <Text style={_.mt.md} type='tinygrailText' size={12}>
              K线图加载中...
            </Text>
          </Loading>
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  chart: {
    height: H_WEBVIEW,
    paddingTop: _.sm,
    backgroundColor: _.colorTinygrailBg,
    borderBottomWidth: _.sm,
    borderBottomColor: _.colorTinygrailBg,
    overflow: 'hidden'
  },
  webview: {
    height: H_WEBVIEW,
    backgroundColor: _.colorTinygrailBg
  },
  loading: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    backgroundColor: _.colorTinygrailBg
  }
}))
