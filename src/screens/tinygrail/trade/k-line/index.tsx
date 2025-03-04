/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:51:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 19:34:57
 */
import React from 'react'
import { View } from 'react-native'
import { Loading, Text } from '@components'
import WebView from '@components/@/web-view'
import { _, tinygrailStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { HOST_CDN } from '@constants'
import html from './html'
import { getKData } from './utils'
import { memoStyles } from './styles'
import { Props } from './types'

let renderCount = 0

class KLine extends React.Component<Props> {
  static defaultProps = {
    focus: false
  }

  componentDidMount() {
    renderCount += 1
  }

  onError = () => {
    const { navigation } = this.props
    navigation.goBack()
    info('网络似乎出了点问题')
  }

  onLoad = () => {
    const { $, focus } = this.props
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
    const { $ } = this.props
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
              html: html(JSON.stringify(getKData($.kline.data, distance)), this.coverStyle),
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

export default ob(KLine)
