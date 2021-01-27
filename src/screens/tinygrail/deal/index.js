/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:13:00
 */
import React from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { Flex, UM } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import StatusBarEvents from '../_/status-bar-events'
import Header from './header'
import Form from './form'
import Depth from './depth'
import Logs from './logs'
import Records from './records'
import Store from './store'

const title = '交易'

export default
@inject(Store)
@obc
class TinygrailDeal extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`tinygrail/deal/${$.monoId}`, 'TinygrailDeal')
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
      <View style={[_.container.flex, this.styles.dark]}>
        <UM screen={title} />
        <StatusBarEvents />
        <StatusBarPlaceholder style={this.styles.dark} />
        <Header />
        <ScrollView
          style={[_.container.flex, this.styles.dark]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
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
      </View>
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
  form: {
    paddingRight: _.wind - _._wind
  },
  depth: {
    width: _.isPad ? 224 : 164,
    marginLeft: _.md
  }
}))
