/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:21:03
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Info from './info'
import Slider from './slider'
import Temples from './temples'
import Auction from './auction'
import AuctionList from './auction-list'
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
          <Text
            style={{
              paddingVertical: _.sm
            }}
            type='tinygrailText'
            size={15}
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
            [交易]
          </Text>
          <Text
            style={[
              {
                paddingVertical: _.sm
              },
              _.ml.sm
            ]}
            type='tinygrailText'
            size={15}
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
            [K线]
          </Text>
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
    const { refreshing } = this.state
    return (
      <ScrollView
        style={this.styles.container}
        contentContainerStyle={_.container.bottom}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
        scrollToTop
      >
        <StatusBarEvents />
        <Info />
        <Slider style={_.mt.sm} />
        <Auction style={_.mt.md} />
        <AuctionList style={_.mt.sm} />
        <Temples />
        <Users />
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
