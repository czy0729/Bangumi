/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:51:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 22:03:17
 */
import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Text } from '@components'
import { _, tinygrailStore } from '@stores'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import html from './html'
import { getKData } from './utils'

let renderCount = 0

export default
@observer
class KLine extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

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

  render() {
    const { $ } = this.context
    const { loading, distance } = $.state
    return (
      <View style={this.styles.chart}>
        {!!$.kline._loaded && (
          <WebView
            key={renderCount}
            style={this.styles.webview}
            useWebKit
            originWhitelist={['*']}
            source={{
              html: html(JSON.stringify(getKData($.kline.data, distance))),
              baseUrl: 'https://cdn.jsdelivr.net'
            }}
            bounces={false}
            scrollEnabled={false}
            onLoad={this.onLoad}
            onError={this.onError}
          />
        )}
        {(!tinygrailStore.state._webview || loading) && (
          <Loading style={this.styles.loading} color={_.colorTinygrailText}>
            <Text style={[this.styles.text, _.mt.md]} size={12}>
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
    height: _.window.height * 0.64,
    paddingTop: _.sm,
    backgroundColor: _.colorTinygrailBg,
    borderBottomWidth: _.sm,
    borderBottomColor: _.colorTinygrailBg,
    overflow: 'hidden'
  },
  webview: {
    height: _.window.height * 0.64,
    backgroundColor: _.colorTinygrailBg
  },
  loading: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    backgroundColor: _.colorTinygrailBg
  },
  text: {
    color: _.colorTinygrailText
  }
}))
