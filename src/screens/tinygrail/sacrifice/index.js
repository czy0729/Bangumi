/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 06:28:43
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { Header, Page, Flex, ScrollView, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import { refreshControlProps } from '@tinygrail/styles'
import Info from './info'
import Slider from './slider'
import Starforces from './starforces'
import Temples from './temples'
import Auction from './auction'
import AuctionList from './auction-list'
import Items from './items'
import Users from './users'
import Store from './store'

export default
@inject(Store)
@obc
class TinygrailSacrifice extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
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
    const { $, navigation } = this.context
    const { style } = this.props
    const { refreshing } = this.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='资产重组'
          hm={[`tinygrail/sacrifice/${$.monoId}`, 'TinygrailSacrifice']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <Flex>
              <Touchable
                style={[
                  {
                    paddingVertical: _.sm
                  },
                  _.mr.md
                ]}
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
                  _.mr.sm
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
            </Flex>
          )}
        />
        <Page style={[_.container.tinygrail, style]}>
          <ScrollView
            contentContainerStyle={_.container.bottom}
            refreshControl={
              <RefreshControl
                {...refreshControlProps}
                colors={[_.colorMain]}
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
            scrollToTop
          >
            <Info />
            <Slider style={_.mt.sm} />
            <Starforces style={_.mt.sm} />
            <Auction style={_.mt.sm} />
            <AuctionList style={_.mt.sm} />
            <Items style={_.mt.sm} />
            <Temples style={_.mt.sm} />
            <Users />
          </ScrollView>
        </Page>
      </>
    )
  }
}
