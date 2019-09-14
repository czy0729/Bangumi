/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:51:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-14 15:39:45
 */
import React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Flex, Text } from '@components'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import _ from '@styles'
import { colorContainer, colorBorder, colorBg } from '../../styles'
import { m15, h1, h4, h12, d1, w1, month1 } from '../store'
import BtnChange from './btn-change'
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
        <Flex style={styles.bar} justify='around'>
          <BtnChange value={m15} text='15分钟' />
          <BtnChange value={h1} text='1小时' />
          <BtnChange value={h4} text='4小时' />
          <BtnChange value={h12} text='12小时' />
          <BtnChange value={d1} text='1日' />
          <BtnChange value={w1} text='1周' />
          <BtnChange value={month1} text='1月' />
        </Flex>
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
          <Loading style={styles.loading} color={_.colorSub}>
            <Text style={_.mt.md} size={12} type='sub'>
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
    backgroundColor: colorBg,
    borderBottomWidth: _.sm,
    borderBottomColor: colorBg,
    overflow: 'hidden'
  },
  bar: {
    paddingVertical: _.sm,
    paddingLeft: 2,
    marginBottom: _.sm,
    backgroundColor: colorContainer,
    borderBottomWidth: 1,
    borderBottomColor: colorBorder
  },
  webview: {
    height: _.window.height * 0.64,
    backgroundColor: colorBg
  },
  loading: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    backgroundColor: colorBg
  }
})
