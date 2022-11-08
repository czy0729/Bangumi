/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 20:30:48
 */
import React from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { Page, Flex, UM } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Header from './header'
import Form from './form'
import Depth from './depth'
import Logs from './logs'
import Records from './records'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

class TinygrailDeal extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()

    hm(`tinygrail/deal/${$.monoId}`, 'TinygrailDeal')
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ }: Ctx = this.context
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
      <Page style={[_.container.flex, this.styles.dark]}>
        <UM title='交易' />
        <StatusBarEvents />
        <StatusBarPlaceholder style={this.styles.dark} />
        <Header />
        <ScrollView
          style={[_.container.flex, this.styles.dark]}
          refreshControl={
            <RefreshControl
              colors={[_.colorMain]}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <Flex style={this.styles.form} align='start'>
            <Flex.Item>
              <Form />
            </Flex.Item>
            <View style={this.styles.depth}>
              <Depth />
            </View>
          </Flex>
          <Logs />
          <Records />
        </ScrollView>
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailDeal))
