/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:13:07
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { Page, ScrollView } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import Header from './header'
import Info from './info'
import Slider from './slider'
import Starforces from './starforces'
import Temples from './temples'
import Auction from './auction'
import AuctionList from './auction-list'
import Items from './items'
import Users from './users'
import Store from './store'
import { Ctx } from './types'

class TinygrailSacrifice extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ } = this.context as Ctx
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
      <>
        <Header />
        <Page style={_.container.tinygrail}>
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

export default inject(Store)(obc(TinygrailSacrifice))
