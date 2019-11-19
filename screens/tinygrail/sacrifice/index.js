/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-19 17:29:23
 */
import React from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { IconHeader } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import { headerStyle, colorContainer } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Info from './info'
import Slider from './slider'
import Temples from './temples'
import Auction from './auction'
import AuctionList from './auction-list'
import Store from './store'

export default
@inject(Store)
@withHeader(headerStyle)
@observer
class TinygrailSacrifice extends React.Component {
  static navigationOptions = {
    title: '资产重组'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
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
          <IconHeader
            name='reverse'
            size={18}
            color={_.colorIcon}
            onPress={() => {
              const { form, monoId } = $.params
              if (form === 'deal') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailDeal', {
                monoId,
                form: 'sacrifice'
              })
            }}
          />
          <IconHeader
            name='k-line'
            color={_.colorIcon}
            onPress={() => {
              const { form, monoId } = $.params
              if (form === 'trade') {
                navigation.goBack()
                return
              }

              navigation.push('TinygrailTrade', {
                monoId,
                form: 'sacrifice'
              })
            }}
          />
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
        style={[_.container.flex, styles.dark]}
        contentContainerStyle={_.container.bottom}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <StatusBarEvents />
        <Info />
        <Slider style={_.mt.sm} />
        <Temples style={_.mt.sm} />
        <Auction style={_.mt.lg} />
        <AuctionList style={_.mt.md} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: colorContainer
  }
})
