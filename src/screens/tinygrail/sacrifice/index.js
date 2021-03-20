/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-20 10:02:35
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import { withHeaderParams, refreshControlProps } from '@tinygrail/styles'
import Info from './info'
import Slider from './slider'
import Starforces from './starforces'
import Temples from './temples'
import Auction from './auction'
import AuctionList from './auction-list'
import Items from './items'
import Users from './users'
import Store from './store'

const title = '资产重组'

export default
@inject(Store)
@withHeader({
  screen: title,
  withHeaderParams
})
@obc
class TinygrailSacrifice extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <>
          <Touchable
            style={{
              paddingVertical: _.sm
            }}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailDeal',
                monoId: $.monoId
              })

              if (form === 'deal') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailDeal', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-attach-money' color={_.colorTinygrailPlain} />
          </Touchable>
          <Touchable
            style={[
              {
                paddingVertical: _.sm
              },
              _.ml.sm
            ]}
            onPress={() => {
              const { form, monoId } = $.params
              t('资产重组.跳转', {
                to: 'TinygrailTrade',
                monoId: $.monoId
              })

              if (form === 'trade') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailTrade', {
                monoId,
                form: 'sacrifice'
              })
            }}
          >
            <Iconfont name='md-waterfall-chart' color={_.colorTinygrailPlain} />
          </Touchable>
        </>
      )
    })

    hm(`tinygrail/sacrifice/${$.monoId}`, 'TinygrailSacrifice')
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ } = this.context
        await $.refresh()
        setTimeout(() => {
          this.setState({
            refreshing: false
          })
        }, 1200)
      }
    )
  }

  render() {
    const { style } = this.props
    const { refreshing } = this.state
    return (
      <ScrollView
        style={[_.container.tinygrail, style]}
        contentContainerStyle={_.container.bottom}
        refreshControl={
          <RefreshControl
            {...refreshControlProps}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
          />
        }
        scrollToTop
      >
        <StatusBarEvents />
        <Info />
        <Slider style={_.mt.sm} />
        <Starforces style={_.mt.sm} />
        <Auction style={_.mt.sm} />
        <AuctionList style={_.mt.sm} />
        <Items style={_.mt.sm} />
        <Temples style={_.mt.sm} />
        <Users />
      </ScrollView>
    )
  }
}
