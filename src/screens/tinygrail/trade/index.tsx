/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 02:35:02
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents, ScrollView, Flex, Button, Touchable, UM } from '@components'
import { SafeAreaView, StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { IOS } from '@constants'
import StatusBarEvents from '../_/status-bar-events'
import Store from './store'
import Header from './header'
import Bar from './bar'
import KLine from './k-line'
import DepthMap from './depth-map'
import DepthList from './depth-list'
import { memoStyles } from './styles'
import { Ctx } from './types'

const title = 'K线'

class TinygrailTrade extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    showMask: true,
    focus: !IOS
  }

  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()

    hm(`tinygrail/trade/${$.monoId}`, 'TinygrailTrade')
  }

  hideMask = () => {
    this.setState({
      showMask: false
    })
  }

  jump = (type: string) => {
    const { $, navigation }: Ctx = this.context
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
    const { navigation }: Ctx = this.context
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
    if (!IOS) return null

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
        <UM title={title} />
        {this.renderFocus()}
        <StatusBarEvents />
        <StatusBarPlaceholder style={this.styles.dark} />
        <Header goBack={this.goBack} />
        <Bar />
        <View style={_.container.flex}>
          <ScrollView
            style={[_.container.flex, this.styles.dark]}
            contentContainerStyle={this.styles.contentContainerStyle}
            scrollToTop
          >
            <View style={this.styles.kline}>
              <KLine focus={focus} />
              {showMask && (
                <Touchable style={this.styles.mask} useRN onPress={this.hideMask} />
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

export default inject(Store)(obc(TinygrailTrade))
