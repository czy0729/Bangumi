/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:51:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-21 00:15:17
 */
import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Text } from '@components'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import _ from '@styles'
import { colorBg, colorText } from '../../styles'
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
    setTimeout(() => {
      $.setState({
        loading: false
      })
    }, 400)
  }

  render() {
    const { $ } = this.context
    const { loading, distance } = $.state
    return (
      <View style={styles.chart}>
        {!!$.kline._loaded && (
          <WebView
            key={renderCount}
            style={styles.webview}
            originWhitelist={['*']}
            source={{
              html: html(JSON.stringify(getKData($.kline.data, distance))),
              baseUrl: 'https://cdn.jsdelivr.net'
            }}
            bounces={false}
            scrollEnabled={false}
            onLoad={this.onLoad}
            onError={this.onError}
            onMessage={this.onMessage}
          />
        )}
        {loading && (
          <Loading style={styles.loading} color={colorText}>
            <Text style={[styles.text, _.mt.md]} size={12}>
              K线图加载中...
            </Text>
          </Loading>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chart: {
    height: _.window.height * 0.64,
    paddingTop: _.sm,
    backgroundColor: colorBg,
    borderBottomWidth: _.sm,
    borderBottomColor: colorBg,
    overflow: 'hidden'
  },
  webview: {
    height: _.window.height * 0.64,
    backgroundColor: colorBg
  },
  loading: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    backgroundColor: colorBg
  },
  text: {
    color: colorText
  }
})
