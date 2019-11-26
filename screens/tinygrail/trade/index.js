/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 21:04:07
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import { Flex, Button, Touchable, UM } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import _ from '@styles'
import { colorBid, colorAsk, colorContainer, colorBg } from '../styles'
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
      <SafeAreaView
        style={[_.container.flex, styles.dark]}
        forceInset={{ top: 'never' }}
      >
        <UM screen={title} />
        {this.renderFocus()}
        <StatusBarEvents />
        <StatusBarPlaceholder style={styles.dark} />
        <Header goBack={this.goBack} />
        <Bar />
        <View style={_.container.flex}>
          <ScrollView
            style={[_.container.flex, styles.dark]}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <View style={styles.kline}>
              <KLine focus={focus} />
              {showMask && (
                <Touchable style={styles.mask} onPress={this.hideMask} />
              )}
            </View>
            <DepthMap />
            <DepthList style={_.mt.md} />
          </ScrollView>
          <Flex style={styles.fixed}>
            <Flex.Item>
              <Button
                style={styles.btnBid}
                type='main'
                onPress={() => this.jump('bid')}
              >
                买入
              </Button>
            </Flex.Item>
            <Flex.Item style={_.ml.sm}>
              <Button
                style={styles.btnAsk}
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
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorContainer
  },
  contentContainerStyle: {
    paddingBottom: 56
  },
  kline: {
    backgroundColor: colorBg
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
    backgroundColor: colorContainer
  },
  btnBid: {
    backgroundColor: colorBid,
    borderWidth: 0,
    borderRadius: 0
  },
  btnAsk: {
    backgroundColor: colorAsk,
    borderWidth: 0,
    borderRadius: 0
  }
})
