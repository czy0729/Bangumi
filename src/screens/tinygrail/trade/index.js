/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 18:01:42
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import { Flex, Button, Touchable, UM } from '@components'
import { SafeAreaView, StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { IOS } from '@constants'
import StatusBarEvents from '../_/status-bar-events'
import Store from './store'
import Header from './header'
import Bar from './bar'
import KLine from './k-line'
import DepthMap from './depth-map'
import DepthList from './depth-list'

const title = 'K线'

export default
@inject(Store)
@observer
class TinygrailTrade extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    showMask: true,
    focus: !IOS
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`tinygrail/trade/${$.monoId}`, 'TinygrailTrade')
  }

  hideMask = () => {
    this.setState({
      showMask: false
    })
  }

  jump = type => {
    const { $, navigation } = this.context
    t('K线.跳转', {
      to: 'TinygrailDeal',
      type,
      monoId: $.monoId
    })

    navigation.push('TinygrailDeal', {
      monoId: $.monoId,
      type,
      form: 'kline'
    })
  }

  goBack = () => {
    const { navigation } = this.context
    if (IOS) {
      this.setState(
        {
          focus: false
        },
        () => navigation.goBack()
      )
      return
    }

    navigation.goBack()
  }

  renderFocus() {
    if (!IOS) {
      return null
    }

    return (
      <NavigationEvents
        onWillBlur={() =>
          this.setState({
            focus: false
          })
        }
        onWillFocus={() =>
          this.setState({
            focus: true
          })
        }
      />
    )
  }

  render() {
    const { showMask, focus } = this.state
    return (
      <SafeAreaView style={this.styles.dark}>
        <UM screen={title} />
        {this.renderFocus()}
        <StatusBarEvents />
        <StatusBarPlaceholder style={this.styles.dark} />
        <Header goBack={this.goBack} />
        <Bar />
        <View style={_.container.flex}>
          <ScrollView
            style={[_.container.flex, this.styles.dark]}
            contentContainerStyle={this.styles.contentContainerStyle}
          >
            <View style={this.styles.kline}>
              <KLine focus={focus} />
              {showMask && (
                <Touchable style={this.styles.mask} onPress={this.hideMask} />
              )}
            </View>
            <DepthMap />
            <DepthList style={_.mt.md} />
          </ScrollView>
          <Flex style={this.styles.fixed}>
            <Flex.Item>
              <Button
                style={this.styles.btnBid}
                type='main'
                onPress={() => this.jump('bid')}
              >
                买入
              </Button>
            </Flex.Item>
            <Flex.Item style={_.ml.sm}>
              <Button
                style={this.styles.btnAsk}
                type='main'
                onPress={() => this.jump('ask')}
              >
                卖出
              </Button>
            </Flex.Item>
          </Flex>
        </View>
      </SafeAreaView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  dark: {
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingBottom: 56
  },
  kline: {
    backgroundColor: _.colorTinygrailBg
  },
  mask: {
    ...StyleSheet.absoluteFill,
    bottom: 40
  },
  fixed: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: _.sm,
    backgroundColor: _.colorTinygrailContainer
  },
  btnBid: {
    backgroundColor: _.colorBid,
    borderWidth: 0,
    borderRadius: 0
  },
  btnAsk: {
    backgroundColor: _.colorAsk,
    borderWidth: 0,
    borderRadius: 0
  }
}))
